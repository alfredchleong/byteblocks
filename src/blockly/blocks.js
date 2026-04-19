import * as Blockly from 'blockly';

// ── Block JSON definitions (ported from legacy block.js) ─────────────────────
const BLOCK_DEFINITIONS = [
  {"type":"when_contract_starts","message0":"when contract starts","hat":"cap","nextStatement":null,"colour":"#E6007A"},
  {"type":"when_tx_received","message0":"when transaction received","hat":"cap","nextStatement":null,"colour":"#E6007A"},
  {"type":"when_event_emitted","message0":"when event emitted","hat":"cap","nextStatement":null,"colour":"#E6007A"},
  {"type":"if_do","message0":"if %1 then %2 end","args0":[{"type":"input_value","name":"CONDITION"},{"type":"input_statement","name":"DO"}],"previousStatement":null,"nextStatement":null,"colour":"#6D3AEE"},
  {"type":"if_do_else","message0":"if %1 then %2 else %3 end","args0":[{"type":"input_value","name":"CONDITION"},{"type":"input_statement","name":"THEN"},{"type":"input_statement","name":"ELSE"}],"previousStatement":null,"nextStatement":null,"colour":"#6D3AEE"},
  {"type":"repeat_do","message0":"repeat %1 do %2 end","args0":[{"type":"input_value","name":"TIMES","check":"Number"},{"type":"input_statement","name":"DO"}],"previousStatement":null,"nextStatement":null,"colour":"#6D3AEE"},
  {"type":"while_do","message0":"while %1 do %2 end","args0":[{"type":"input_value","name":"CONDITION"},{"type":"input_statement","name":"DO"}],"previousStatement":null,"nextStatement":null,"colour":"#6D3AEE"},
  {"type":"return_value","message0":"return %1","args0":[{"type":"input_value","name":"VALUE"}],"previousStatement":null,"nextStatement":null,"colour":"#6D3AEE"},
  {"type":"require","message0":"🔒 require < %1 >","args0":[{"type":"input_value","name":"CONDITION","check":["Boolean","String","Number"]}],"previousStatement":null,"nextStatement":null,"colour":"#6D3AEE"},
  {"type":"set_variable","message0":"set variable %1 to %2","args0":[{"type":"field_variable","name":"VAR"},{"type":"input_value","name":"VALUE"}],"previousStatement":null,"nextStatement":null,"colour":"#00B2FF"},
  {"type":"change_variable","message0":"change variable %1 by %2","args0":[{"type":"field_variable","name":"VAR"},{"type":"input_value","name":"VALUE"}],"previousStatement":null,"nextStatement":null,"colour":"#00B2FF"},
  {"type":"show_variable","message0":"show variable %1","args0":[{"type":"field_variable","name":"VAR"}],"previousStatement":null,"nextStatement":null,"colour":"#00B2FF"},
  {"type":"hide_variable","message0":"hide variable %1","args0":[{"type":"field_variable","name":"VAR"}],"previousStatement":null,"nextStatement":null,"colour":"#00B2FF"},
  {"type":"define_function","message0":"🔧 define %1","args0":[{"type":"field_input","name":"FUNC_NAME","text":"fnName"}],"previousStatement":null,"nextStatement":null,"colour":"#00B2FF"},
  {"type":"call_function","message0":"call %1","args0":[{"type":"field_input","name":"FUNC_NAME","text":"fnName"}],"previousStatement":null,"nextStatement":null,"colour":"#00B2FF"},
  {"type":"math_number","message0":"%1","args0":[{"type":"field_number","name":"NUM","value":0}],"output":"Number","colour":"#08C168"},
  {"type":"math_add","message0":"%1 + %2","args0":[{"type":"input_value","name":"A","check":["Number","String"]},{"type":"input_value","name":"B","check":"Number"}],"output":"Number","colour":"#08C168"},
  {"type":"math_subtract","message0":"%1 - %2","args0":[{"type":"input_value","name":"A","check":["Number","String"]},{"type":"input_value","name":"B","check":"Number"}],"output":"Number","colour":"#08C168"},
  {"type":"math_multiply","message0":"%1 * %2","args0":[{"type":"input_value","name":"A","check":["Number","String"]},{"type":"input_value","name":"B","check":"Number"}],"output":"Number","colour":"#08C168"},
  {"type":"math_divide","message0":"%1 / %2","args0":[{"type":"input_value","name":"A","check":["Number","String"]},{"type":"input_value","name":"B","check":"Number"}],"output":"Number","colour":"#08C168"},
  {"type":"math_sqrt","message0":"sqrt %1","args0":[{"type":"input_value","name":"NUM","check":["Number","String"]}],"output":"Number","colour":"#08C168"},
  {"type":"math_min","message0":"min %1 , %2","args0":[{"type":"input_value","name":"A","check":["Number","String"]},{"type":"input_value","name":"B","check":"Number"}],"output":"Number","colour":"#08C168"},
  {"type":"math_compare","message0":"%1 %2 %3","args0":[{"type":"input_value","name":"A","check":["Number","String"]},{"type":"field_dropdown","name":"OP","options":[["<","LT"],[">","GT"],["=","EQ"],["≠","NEQ"],["≤","LTE"],["≥","GTE"]]},{"type":"input_value","name":"B","check":"Number"}],"output":"Boolean","colour":"#08C168"},
  {"type":"logic_and","message0":"%1 and %2","args0":[{"type":"input_value","name":"A","check":"Boolean"},{"type":"input_value","name":"B","check":"Boolean"}],"output":"Boolean","colour":"#08C168"},
  {"type":"logic_or","message0":"%1 or %2","args0":[{"type":"input_value","name":"A","check":"Boolean"},{"type":"input_value","name":"B","check":"Boolean"}],"output":"Boolean","colour":"#08C168"},
  {"type":"logic_not","message0":"not %1","args0":[{"type":"input_value","name":"BOOL","check":"Boolean"}],"output":"Boolean","colour":"#08C168"},
  {"type":"math_random","message0":"random from %1 to %2","args0":[{"type":"input_value","name":"FROM","check":"Number"},{"type":"input_value","name":"TO","check":"Number"}],"output":"Number","colour":"#08C168"},
  {"type":"storage_store","message0":"store key %1 value %2","args0":[{"type":"input_value","name":"KEY"},{"type":"input_value","name":"VALUE"}],"previousStatement":null,"nextStatement":null,"colour":"#FF8C00"},
  {"type":"storage_read","message0":"read key %1","args0":[{"type":"input_value","name":"KEY"}],"output":"Number","colour":"#FF8C00"},
  {"type":"storage_delete","message0":"delete key %1","args0":[{"type":"input_value","name":"KEY"}],"previousStatement":null,"nextStatement":null,"colour":"#FF8C00"},
  {"type":"chain_call","message0":"call contract %1 method %2","args0":[{"type":"input_value","name":"CONTRACT"},{"type":"field_input","name":"METHOD","text":"method"}],"previousStatement":null,"nextStatement":null,"colour":"#FF5E5E"},
  {"type":"chain_instantiate","message0":"instantiate contract %1","args0":[{"type":"input_value","name":"CONTRACT"}],"previousStatement":null,"nextStatement":null,"colour":"#FF5E5E"},
  {"type":"chain_query","message0":"query chain for %1","args0":[{"type":"input_value","name":"QUERY"}],"previousStatement":null,"nextStatement":null,"colour":"#FF5E5E"},
  {"type":"send_tokens","message0":"send %1 tokens to %2","args0":[{"type":"input_value","name":"AMOUNT"},{"type":"input_value","name":"TO"}],"previousStatement":null,"nextStatement":null,"colour":"#9966FF"},
  {"type":"receive_tokens","message0":"receive %1 tokens from %2","args0":[{"type":"input_value","name":"AMOUNT"},{"type":"input_value","name":"FROM"}],"previousStatement":null,"nextStatement":null,"colour":"#9966FF"},
  {"type":"get_balance","message0":"get balance of account %1","args0":[{"type":"input_value","name":"ACCOUNT"}],"output":"Number","colour":"#9966FF"},
  {"type":"mint_tokens","message0":"mint %1 tokens to %2","args0":[{"type":"input_value","name":"AMOUNT"},{"type":"input_value","name":"TO"}],"previousStatement":null,"nextStatement":null,"colour":"#FF00AA"},
  {"type":"burn_tokens","message0":"burn %1 tokens from %2","args0":[{"type":"input_value","name":"AMOUNT"},{"type":"input_value","name":"FROM"}],"previousStatement":null,"nextStatement":null,"colour":"#FF00AA"},
  {"type":"approve_allowance","message0":"approve %1 to spend %2 tokens","args0":[{"type":"input_value","name":"SPENDER"},{"type":"input_value","name":"AMOUNT"}],"previousStatement":null,"nextStatement":null,"colour":"#FF00AA"},
  {"type":"transfer_from","message0":"transfer %1 tokens from %2 to %3","args0":[{"type":"input_value","name":"AMOUNT"},{"type":"input_value","name":"FROM"},{"type":"input_value","name":"TO"}],"previousStatement":null,"nextStatement":null,"colour":"#FF00AA"},
  {"type":"get_allowance","message0":"allowance of %1 by %2","args0":[{"type":"input_value","name":"OWNER"},{"type":"input_value","name":"SPENDER"}],"output":"Number","colour":"#FF00AA"},
  {"type":"emit_event","message0":"emit event %1 ( %2 )","args0":[{"type":"field_input","name":"eventName","text":"EventName"},{"type":"field_input","name":"eventParams","text":"..."}],"previousStatement":null,"nextStatement":null,"colour":"#FFA500"},
  {"type":"open_wallet","message0":"open wallet","previousStatement":null,"nextStatement":null,"colour":"#E6007A"},
  {"type":"sign_transaction","message0":"sign transaction","previousStatement":null,"nextStatement":null,"colour":"#E6007A"},
  {"type":"broadcast_transaction","message0":"broadcast transaction","previousStatement":null,"nextStatement":null,"colour":"#E6007A"},
  {"type":"on_tx_confirmed","message0":"on tx confirmed do %1 end","args0":[{"type":"input_statement","name":"DO"}],"previousStatement":null,"nextStatement":null,"colour":"#E6007A"},
  {"type":"add_liquidity","message0":"🔧 define addLiquidity (%1 , %2)","args0":[{"type":"field_input","name":"PARAM_A","text":"amountA"},{"type":"field_input","name":"PARAM_B","text":"amountB"}],"previousStatement":null,"nextStatement":null,"colour":"#D65C5C"},
  {"type":"remove_liquidity","message0":"🔧 define removeLiquidity (%1)","args0":[{"type":"field_input","name":"PARAM","text":"shares"}],"previousStatement":null,"nextStatement":null,"colour":"#D65C5C"},
  {"type":"swapAforB","message0":"🔧 define swapAforB (%1)","args0":[{"type":"field_input","name":"PARAM","text":"amountA"}],"previousStatement":null,"nextStatement":null,"colour":"#D65C5C"},
  {"type":"swapBforA","message0":"🔧 define swapBforA (%1)","args0":[{"type":"field_input","name":"PARAM","text":"amountB"}],"previousStatement":null,"nextStatement":null,"colour":"#D65C5C"},
  {"type":"text_literal","message0":"%1","args0":[{"type":"field_input","name":"TEXT","text":"default text"}],"output":"String","colour":"#00B2FF"},
  {"type":"msg_sender","message0":"msg.sender","output":"String","colour":"#00B2FF"},
  {"type":"last_minted_token_id","message0":"lastMintedTokenId","output":"Number","colour":"#08C168"},
  {"type":"text_join","message0":"join %1 %2","args0":[{"type":"input_value","name":"A","check":"String"},{"type":"input_value","name":"B","check":"String"}],"output":"String","colour":"#00B2FF"},
];

let registered = false;

export function registerBlocks() {
  if (registered) return;
  registered = true;
  Blockly.defineBlocksWithJsonArray(BLOCK_DEFINITIONS);
}

// ── English-output code generation helpers ───────────────────────────────────

function getInputText(block, name) {
  const target = block.getInputTargetBlock(name);
  if (!target) return '';
  if (target.type === 'math_number') return target.getFieldValue('NUM');
  if (target.type === 'text_literal') return target.getFieldValue('TEXT');
  return blockToEnglish(target);
}

function getStatementText(block, name) {
  const first = block.getInputTargetBlock(name);
  if (!first) return '';
  const lines = [];
  traverseBlock(first, lines, 2);
  return lines.join('\n') + '\n';
}

function blockToEnglish(block) {
  switch (block.type) {
    case 'when_contract_starts':   return '▶️ when contract starts';
    case 'when_tx_received':       return '▶️ when transaction received';
    case 'when_event_emitted':     return '▶️ when event emitted';
    case 'knot_auth':              return 'Knot API: Authenticate';
    case 'knot_sync_cart':         return `Knot API: Add Product to Cart (Product ID: ${getInputText(block, 'PRODUCT_ID')})`;
    case 'knot_checkout':          return 'Knot API: Checkout';
    case 'if_do': {
      const c = getInputText(block, 'CONDITION');
      const b = getStatementText(block, 'DO');
      return `if ${c} then\n${b}end`;
    }
    case 'if_do_else': {
      const c = getInputText(block, 'CONDITION');
      const t = getStatementText(block, 'THEN');
      const e = getStatementText(block, 'ELSE');
      return `if ${c} then\n${t}else\n${e}end`;
    }
    case 'repeat_do': {
      const t = getInputText(block, 'TIMES');
      const b = getStatementText(block, 'DO');
      return `repeat ${t} times\n${b}end`;
    }
    case 'while_do': {
      const c = getInputText(block, 'CONDITION');
      const b = getStatementText(block, 'DO');
      return `while ${c} do\n${b}end`;
    }
    case 'on_tx_confirmed': {
      const b = getStatementText(block, 'DO');
      return `on tx confirmed do\n${b}end`;
    }
    case 'return_value':    return `return ${getInputText(block, 'VALUE')}`;
    case 'require':         return `🔒 require < ${getInputText(block, 'CONDITION')} >`;
    case 'set_variable':    return `set variable ${block.getFieldValue('VAR')} to (${getInputText(block, 'VALUE')})`;
    case 'change_variable': return `change variable ${block.getFieldValue('VAR')} by (${getInputText(block, 'VALUE')})`;
    case 'show_variable':   return `show variable ${block.getFieldValue('VAR')}`;
    case 'hide_variable':   return `hide variable ${block.getFieldValue('VAR')}`;
    case 'define_function': return `🔧 define ${block.getFieldValue('FUNC_NAME')} (…)`;
    case 'call_function':   return `call ${block.getFieldValue('FUNC_NAME')} (…)`;
    case 'math_number':     return block.getFieldValue('NUM');
    case 'math_add':        return `${getInputText(block, 'A')} + ${getInputText(block, 'B')}`;
    case 'math_subtract':   return `${getInputText(block, 'A')} - ${getInputText(block, 'B')}`;
    case 'math_multiply':   return `${getInputText(block, 'A')} * ${getInputText(block, 'B')}`;
    case 'math_divide':     return `${getInputText(block, 'A')} / ${getInputText(block, 'B')}`;
    case 'math_sqrt':       return `sqrt(${getInputText(block, 'NUM')})`;
    case 'math_min':        return `min(${getInputText(block, 'A')}, ${getInputText(block, 'B')})`;
    case 'math_compare': {
      const ops = { LT:'<', GT:'>', EQ:'=', NEQ:'≠', LTE:'≤', GTE:'≥' };
      return `${getInputText(block, 'A')} ${ops[block.getFieldValue('OP')]} ${getInputText(block, 'B')}`;
    }
    case 'logic_and':       return `${getInputText(block, 'A')} and ${getInputText(block, 'B')}`;
    case 'logic_or':        return `${getInputText(block, 'A')} or ${getInputText(block, 'B')}`;
    case 'logic_not':       return `not ${getInputText(block, 'BOOL')}`;
    case 'math_random':     return `random from ${getInputText(block, 'FROM')} to ${getInputText(block, 'TO')}`;
    case 'storage_store':   return `store key ${getInputText(block, 'KEY')} value ${getInputText(block, 'VALUE')}`;
    case 'storage_read':    return `read key ${getInputText(block, 'KEY')}`;
    case 'storage_delete':  return `delete key ${getInputText(block, 'KEY')}`;
    case 'chain_call':      return `call contract ${getInputText(block, 'CONTRACT')} method ${block.getFieldValue('METHOD')}`;
    case 'chain_instantiate': return `instantiate contract ${getInputText(block, 'CONTRACT')}`;
    case 'chain_query':     return `query chain for ${getInputText(block, 'QUERY')}`;
    case 'send_tokens':     return `send ${getInputText(block, 'AMOUNT')} tokens to ${getInputText(block, 'TO')}`;
    case 'receive_tokens':  return `receive ${getInputText(block, 'AMOUNT')} tokens from ${getInputText(block, 'FROM')}`;
    case 'get_balance':     return `get balance of account ${getInputText(block, 'ACCOUNT')}`;
    case 'mint_tokens':     return `mint ${getInputText(block, 'AMOUNT')} tokens to ${getInputText(block, 'TO')}`;
    case 'burn_tokens':     return `burn ${getInputText(block, 'AMOUNT')} tokens from ${getInputText(block, 'FROM')}`;
    case 'approve_allowance': return `approve ${getInputText(block, 'SPENDER')} to spend ${getInputText(block, 'AMOUNT')} tokens`;
    case 'transfer_from':   return `transfer ${getInputText(block, 'AMOUNT')} tokens from ${getInputText(block, 'FROM')} to ${getInputText(block, 'TO')}`;
    case 'get_allowance':   return `allowance of ${getInputText(block, 'OWNER')} by ${getInputText(block, 'SPENDER')}`;
    case 'emit_event':      return `emit event ${block.getFieldValue('eventName')} (${block.getFieldValue('eventParams')})`;
    case 'open_wallet':     return 'open wallet';
    case 'sign_transaction':return 'sign transaction';
    case 'broadcast_transaction': return 'broadcast transaction';
    case 'text_literal':    return block.getFieldValue('TEXT');
    case 'msg_sender':      return 'msg.sender';
    case 'last_minted_token_id': return 'lastMintedTokenId';
    case 'text_join':       return `join ${getInputText(block, 'A')} ${getInputText(block, 'B')}`;
    case 'add_liquidity':   return `🔧 define addLiquidity (${block.getFieldValue('PARAM_A')}, ${block.getFieldValue('PARAM_B')})`;
    case 'remove_liquidity':return `🔧 define removeLiquidity (${block.getFieldValue('PARAM')})`;
    case 'swapAforB':       return `🔧 define swapAforB (${block.getFieldValue('PARAM')})`;
    case 'swapBforA':       return `🔧 define swapBforA (${block.getFieldValue('PARAM')})`;
    default:                return block.type;
  }
}

export function traverseBlock(block, lines, indent = 0) {
  lines.push(' '.repeat(indent) + blockToEnglish(block));
  const next = block.getNextBlock();
  if (next) traverseBlock(next, lines, indent);
}
