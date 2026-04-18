from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import subprocess
import json
import os
import time
import re
import sys
import logging
from google import genai
from google.genai import types

app = Flask(__name__)
CORS(app)
# Configure logging for more visibility
logging.basicConfig(level=logging.INFO, 
                   format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')

@app.route('/deploy', methods=['POST'])
def deploy():
    # Deploy generated smart contract code
    subprocess.run(['npm', 'run', 'deploy'], check=True)
    with open('deployment-info.json', 'r') as file:
        json_string = file.read()

    return jsonify({
        "message": json_string
    })

@app.route('/compile', methods=['POST'])
def compile():
    # Get the data from the incoming request
    incoming_data = request.json
    user_message = incoming_data.get('message', '')
    app.logger.info(f"Compile request message: {user_message[:50]}...")

    # Build and send OpenAI request for solidity compilation
    with open('generationsystemprompt.txt', 'r') as file:
        system_prompt = file.read()
    formatted_user_message = f"""
I need an solidity smart contract for Polkadot based on this pseudocode, it is necessary for there to be a constructor: {user_message}

USE SOLIDITY.
"""
    response_data = call_openai(system_prompt, formatted_user_message)
    if isinstance(response_data, tuple):
        # error tuple returned
        return response_data[0], response_data[1]

    # Save and compile
    os.makedirs('contracts', exist_ok=True)
    with open('contracts/contract.sol', 'w') as f:
        f.write(response_data)
    subprocess.run(['npm', 'run', 'compile'], check=True)
    return jsonify({"message": response_data})

@app.route('/review', methods=['POST'])
def review():
    # Review pseudocode and suggest improvements
    incoming_data = request.json
    user_message = incoming_data.get('message', '')
    app.logger.info(f"Review request message: {user_message[:50]}...")

    # Use a specialized system prompt or reuse general one
    with open('reviewsystemprompt.txt', 'r', encoding='utf-8') as file:
        system_prompt = file.read()
        formatted_review_message = (
            "Here is some pseudocode describing contract logic:\n"
            f"{user_message}\n\n"
            "Please provide *only* feedback on clarity, security concerns, and design—no code samples."
)
    response_data = call_openai(system_prompt, formatted_review_message)
    if isinstance(response_data, tuple):
        return response_data[0], response_data[1]

    return jsonify({"message": response_data})


def call_openai(system_prompt: str, user_content: str):
    api_key = os.getenv('OPENAI_API_KEY')

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}"
    }

    url = "https://api.openai.com/v1/chat/completions"

    data = {
        "model": "gpt-4o",
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_content}
        ],
        "temperature": 0.1,
        "response_format": {"type": "text"}
    }

    try:
        response = requests.post(url, headers=headers, json=data)
        response.raise_for_status()
        raw = response.json()["choices"][0]["message"]["content"]
        # strip code fences
        cleaned = re.sub(r'```[\s\S]*?```', lambda m: m.group(0).strip('```'), raw)
        return cleaned
    
    except requests.exceptions.RequestException as e:
        error_message = str(e)
        status_code = getattr(e.response, 'status_code', 500)
        logging.error(f"OpenAI API error: {error_message}")
        return (jsonify({
            "status": "error",
            "message": f"API error: {error_message}"
        }), status_code)
    
    except Exception as e:
        logging.error(f"Unexpected error: {str(e)}")
        return (jsonify({"status": "error", "message": str(e)}), 500)


def call_gemini(system_prompt: str, user_content: str):
    try:

        client = genai.Client()
        
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=user_content,
            config=types.GenerateContentConfig(
                system_instruction=system_prompt,
                temperature=0.1,
            )
        )
        
        raw = response.text
        cleaned = raw.strip()
        cleaned = re.sub(r'^```[a-zA-Z0-9]*\n', '', cleaned)
        cleaned = re.sub(r'\n```$', '', cleaned)
        
        return cleaned

    except Exception as e:
        logging.error(f"Gemini SDK error: {str(e)}")
        return (jsonify({"status": "error", "message": f"API error: {str(e)}"}), 500)


if __name__ == '__main__':
    os.environ['PYTHONUNBUFFERED'] = '1'
    port = int(os.environ.get('PORT', 8888))
    app.logger.info("Starting Flask server")
    app.run(host='0.0.0.0', port=port, debug=False)
