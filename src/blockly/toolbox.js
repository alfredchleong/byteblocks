// Blockly toolbox configuration (JSON format, Blockly v12)
const toolboxConfig = {
  kind: 'categoryToolbox',
  contents: [
    {
      kind: 'category',
      name: 'Events & Entry Points',
      colour: '#E6007A',
      contents: [
        { kind: 'block', type: 'when_contract_starts' },
        { kind: 'block', type: 'when_tx_received' },
        { kind: 'block', type: 'when_event_emitted' },
      ],
    },
    {
      kind: 'category',
      name: 'Control Flow',
      colour: '#6D3AEE',
      contents: [
        { kind: 'block', type: 'if_do' },
        { kind: 'block', type: 'if_do_else' },
        { kind: 'block', type: 'repeat_do' },
        { kind: 'block', type: 'while_do' },
        { kind: 'block', type: 'return_value' },
        { kind: 'block', type: 'require' },
      ],
    },
    {
      kind: 'category',
      name: 'Variables & Data',
      colour: '#00B2FF',
      contents: [
        { kind: 'block', type: 'set_variable' },
        { kind: 'block', type: 'change_variable' },
        { kind: 'block', type: 'show_variable' },
        { kind: 'block', type: 'hide_variable' },
        { kind: 'block', type: 'define_function' },
        { kind: 'block', type: 'call_function' },
      ],
    },
    {
      kind: 'category',
      name: 'Math & Logic',
      colour: '#08C168',
      contents: [
        { kind: 'block', type: 'math_number' },
        { kind: 'block', type: 'math_add' },
        { kind: 'block', type: 'math_subtract' },
        { kind: 'block', type: 'math_multiply' },
        { kind: 'block', type: 'math_divide' },
        { kind: 'block', type: 'math_sqrt' },
        { kind: 'block', type: 'math_min' },
        { kind: 'block', type: 'math_compare' },
        { kind: 'block', type: 'logic_and' },
        { kind: 'block', type: 'logic_or' },
        { kind: 'block', type: 'logic_not' },
        { kind: 'block', type: 'math_random' },
      ],
    },
    {
      kind: 'category',
      name: 'Contract Storage',
      colour: '#FF8C00',
      contents: [
        { kind: 'block', type: 'storage_store' },
        { kind: 'block', type: 'storage_read' },
        { kind: 'block', type: 'storage_delete' },
      ],
    },
    {
      kind: 'category',
      name: 'Chain Interaction',
      colour: '#FF5E5E',
      contents: [
        { kind: 'block', type: 'chain_call' },
        { kind: 'block', type: 'chain_instantiate' },
        { kind: 'block', type: 'chain_query' },
      ],
    },
    {
      kind: 'category',
      name: 'Token & Balance',
      colour: '#9966FF',
      contents: [
        { kind: 'block', type: 'send_tokens' },
        { kind: 'block', type: 'receive_tokens' },
        { kind: 'block', type: 'get_balance' },
      ],
    },
    {
      kind: 'category',
      name: 'Token Management',
      colour: '#FF00AA',
      contents: [
        { kind: 'block', type: 'mint_tokens' },
        { kind: 'block', type: 'burn_tokens' },
        { kind: 'block', type: 'approve_allowance' },
        { kind: 'block', type: 'transfer_from' },
        { kind: 'block', type: 'get_allowance' },
      ],
    },
    {
      kind: 'category',
      name: 'Events',
      colour: '#FFA500',
      contents: [
        { kind: 'block', type: 'emit_event' },
      ],
    },
    {
      kind: 'category',
      name: 'Wallet & TX',
      colour: '#E6007A',
      contents: [
        { kind: 'block', type: 'open_wallet' },
        { kind: 'block', type: 'sign_transaction' },
        { kind: 'block', type: 'broadcast_transaction' },
        { kind: 'block', type: 'on_tx_confirmed' },
      ],
    },
    {
      kind: 'category',
      name: 'AMM',
      colour: '#D65C5C',
      contents: [
        { kind: 'block', type: 'add_liquidity' },
        { kind: 'block', type: 'remove_liquidity' },
        { kind: 'block', type: 'swapAforB' },
        { kind: 'block', type: 'swapBforA' },
      ],
    },
    {
      kind: 'category',
      name: 'Text',
      colour: '#00B2FF',
      contents: [
        { kind: 'block', type: 'text_literal' },
        { kind: 'block', type: 'text_join' },
        { kind: 'block', type: 'msg_sender' },
      ],
    }
  ],
};

export default toolboxConfig;
