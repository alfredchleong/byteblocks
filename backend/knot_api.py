import os
import base64
import requests

def get_auth_header():
    client_id = os.environ.get("KNOT_CLIENT_ID")
    secret = os.environ.get("KNOT_SECRET")
    
    if not client_id or not secret:
        raise ValueError("KNOT_CLIENT_ID and KNOT_SECRET must be set in .env")
        
    credentials = f"{client_id}:{secret}"
    encoded = base64.b64encode(credentials.encode('utf-8')).decode('utf-8')
    return f"Basic {encoded}"

def execute_purchase(external_id: str):
    """
    Executes a Knot API shopping cart sync and checkout.
    """
    headers = {
        "Authorization": get_auth_header(),
        "Content-Type": "application/json"
    }
    
    # Using development environment as per docs
    base_url = "https://development.knotapi.com"
    
    # 1. Sync Cart
    cart_payload = {
        "external_user_id": "hackathon_demo_user",
        "merchant_id": 46,  # Mock merchant ID as shown in docs
        "products": [
            {
                "external_id": external_id
            }
        ]
    }
    
    print(f"[KNOT API] Syncing cart for item: {external_id}...")
    cart_res = requests.post(f"{base_url}/cart", json=cart_payload, headers=headers)
    
    if cart_res.status_code not in (200, 202):
        raise Exception(f"Failed to sync cart (Status {cart_res.status_code}): {cart_res.text}")
        
    # 2. Checkout
    checkout_payload = {
        "external_user_id": "hackathon_demo_user",
        "merchant_id": 46
    }
    
    print(f"[KNOT API] Executing checkout...")
    checkout_res = requests.post(f"{base_url}/cart/checkout", json=checkout_payload, headers=headers)
    
    if checkout_res.status_code not in (200, 202):
        raise Exception(f"Failed to checkout (Status {checkout_res.status_code}): {checkout_res.text}")
        
    return {
        "status": "success", 
        "message": "Item checked out successfully via Knot API."
    }
