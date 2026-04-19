import React from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';

// Simplified port of block colors
const TYPE_COLORS: Record<string, string> = {
  'when_contract_starts': '#E6007A', 'when_tx_received': '#E6007A', 'when_event_emitted': '#E6007A', 'on_tx_confirmed': '#E6007A', 'open_wallet': '#E6007A', 'sign_transaction': '#E6007A', 'broadcast_transaction': '#E6007A',
  'if_do': '#6D3AEE', 'if_do_else': '#6D3AEE', 'repeat_do': '#6D3AEE', 'while_do': '#6D3AEE', 'return_value': '#6D3AEE', 'require': '#6D3AEE',
  'set_variable': '#00B2FF', 'change_variable': '#00B2FF', 'show_variable': '#00B2FF', 'hide_variable': '#00B2FF', 'define_function': '#00B2FF', 'call_function': '#00B2FF', 'text_literal': '#00B2FF', 'msg_sender': '#00B2FF', 'text_join': '#00B2FF',
  'math_number': '#08C168', 'math_add': '#08C168', 'math_subtract': '#08C168', 'math_multiply': '#08C168', 'math_divide': '#08C168', 'math_sqrt': '#08C168', 'math_min': '#08C168', 'math_compare': '#08C168', 'logic_and': '#08C168', 'logic_or': '#08C168', 'logic_not': '#08C168', 'math_random': '#08C168', 'last_minted_token_id': '#08C168',
  'storage_store': '#FF8C00', 'storage_read': '#FF8C00', 'storage_delete': '#FF8C00',
  'send_tokens': '#9966FF', 'receive_tokens': '#9966FF', 'get_balance': '#9966FF',
  'mint_tokens': '#FF00AA', 'burn_tokens': '#FF00AA', 'approve_allowance': '#FF00AA', 'transfer_from': '#FF00AA', 'get_allowance': '#FF00AA',
  'chain_call': '#FF5E5E', 'chain_instantiate': '#FF5E5E', 'chain_query': '#FF5E5E',
  'emit_event': '#FFA500',
  'add_liquidity': '#D65C5C', 'remove_liquidity': '#D65C5C', 'swapAforB': '#D65C5C', 'swapBforA': '#D65C5C',
  'default': '#4b4b6b'
};

// Define structure for each node type
const getNodeConfig = (type: string) => {
  const isEvent = type.startsWith('when_') || type === 'on_tx_confirmed';
  const isDataOnly = type.startsWith('math_') || type.startsWith('logic_') || ['storage_read', 'get_balance', 'get_allowance', 'msg_sender', 'last_minted_token_id', 'text_literal', 'text_join'].includes(type);
  
  const config = {
    execIn: !isEvent && !isDataOnly,
    execOut: !isDataOnly,
    branches: [] as { id: string, label: string }[],
    inputs: [] as { id: string, label: string }[],
    outputs: isDataOnly ? [{ id: 'RESULT', label: 'Value' }] : []
  };

  // Custom logic overrides
  if (type === 'if_do') {
    config.inputs.push({ id: 'CONDITION', label: 'Condition' });
    config.branches.push({ id: 'DO', label: 'Do' });
  } else if (type === 'if_do_else') {
    config.inputs.push({ id: 'CONDITION', label: 'Condition' });
    config.branches.push({ id: 'THEN', label: 'Then' });
    config.branches.push({ id: 'ELSE', label: 'Else' });
  } else if (type === 'repeat_do') {
    config.inputs.push({ id: 'TIMES', label: 'Times' });
    config.branches.push({ id: 'DO', label: 'Do' });
  } else if (type === 'while_do') {
    config.inputs.push({ id: 'CONDITION', label: 'Condition' });
    config.branches.push({ id: 'DO', label: 'Do' });
  } else if (type === 'when_event_emitted') {
    config.inputs.push({ id: 'EVENT_NAME', label: 'Event Name' });
  } else if (type === 'knot_sync_cart') {
    config.inputs.push({ id: 'PRODUCT_ID', label: 'Product ID (ASIN)' });
  } else if (type === 'on_tx_confirmed') {
    config.branches.push({ id: 'DO', label: 'Do' });
  } else if (['math_add', 'math_subtract', 'math_multiply', 'math_divide', 'math_min', 'math_compare', 'logic_and', 'logic_or', 'text_join'].includes(type)) {
    config.inputs.push({ id: 'A', label: 'A' }, { id: 'B', label: 'B' });
  } else if (type === 'math_sqrt' || type === 'logic_not') {
    config.inputs.push({ id: 'A', label: 'Value' });
  } else if (type === 'math_random') {
    config.inputs.push({ id: 'FROM', label: 'From' }, { id: 'TO', label: 'To' });
  } else if (type === 'require') {
    config.inputs.push({ id: 'CONDITION', label: 'Condition' });
  } else if (type === 'return_value') {
    config.inputs.push({ id: 'VALUE', label: 'Value' });
    config.execOut = false;
  } else if (['set_variable', 'change_variable'].includes(type)) {
    config.inputs.push({ id: 'VAR_NAME', label: 'Var Name' }, { id: 'VALUE', label: 'Value' });
  } else if (['show_variable', 'hide_variable'].includes(type)) {
    config.inputs.push({ id: 'VAR_NAME', label: 'Var Name' });
  } else if (type === 'define_function' || type === 'call_function') {
    config.inputs.push({ id: 'FUNC_NAME', label: 'Function Name' });
  } else if (type === 'math_number') {
    config.inputs.push({ id: 'NUM', label: 'Number' });
  } else if (type === 'text_literal') {
    config.inputs.push({ id: 'TEXT', label: 'Text' });
  } else if (type === 'storage_store') {
    config.inputs.push({ id: 'KEY', label: 'Key' }, { id: 'VALUE', label: 'Value' });
  } else if (['storage_read', 'storage_delete'].includes(type)) {
    config.inputs.push({ id: 'KEY', label: 'Key' });
  } else if (type === 'chain_call') {
    config.inputs.push({ id: 'CONTRACT', label: 'Contract' }, { id: 'METHOD', label: 'Method' });
  } else if (['chain_instantiate', 'chain_query'].includes(type)) {
    config.inputs.push({ id: 'TARGET', label: 'Target' });
  } else if (['send_tokens', 'mint_tokens'].includes(type)) {
    config.inputs.push({ id: 'AMOUNT', label: 'Amount' }, { id: 'TO', label: 'To' });
  } else if (['receive_tokens', 'burn_tokens'].includes(type)) {
    config.inputs.push({ id: 'AMOUNT', label: 'Amount' }, { id: 'FROM', label: 'From' });
  } else if (type === 'get_balance') {
    config.inputs.push({ id: 'ACCOUNT', label: 'Account' });
  } else if (type === 'approve_allowance') {
    config.inputs.push({ id: 'SPENDER', label: 'Spender' }, { id: 'AMOUNT', label: 'Amount' });
  } else if (type === 'transfer_from') {
    config.inputs.push({ id: 'AMOUNT', label: 'Amount' }, { id: 'FROM', label: 'From' }, { id: 'TO', label: 'To' });
  } else if (type === 'get_allowance') {
    config.inputs.push({ id: 'OWNER', label: 'Owner' }, { id: 'SPENDER', label: 'Spender' });
  } else if (type === 'emit_event') {
    config.inputs.push({ id: 'EVENT_NAME', label: 'Event Name' }, { id: 'PARAMS', label: 'Params' });
  } else if (type === 'add_liquidity') {
    config.inputs.push({ id: 'AMOUNT_A', label: 'Amount A' }, { id: 'AMOUNT_B', label: 'Amount B' });
  } else if (['remove_liquidity', 'swapAforB', 'swapBforA'].includes(type)) {
    config.inputs.push({ id: 'AMOUNT', label: 'Amount' });
  }

  return config;
};

export default function LogicNode({ id, data, isConnectable }) {
  const color = TYPE_COLORS[data.type] || TYPE_COLORS['default'];
  const config = getNodeConfig(data.type);
  const { updateNodeData } = useReactFlow();

  const handleInputChange = (e, inputId) => {
    updateNodeData(id, { [inputId]: e.target.value });
  };

  return (
    <div 
      className="rounded shadow-md border border-[#2e2e3e] text-xs min-w-[150px] flex flex-col relative"
      style={{ backgroundColor: `${color}25`, borderColor: color }}
    >
      {/* Execution In Handle (Left) */}
      {config.execIn && (
        <Handle
          type="target"
          position={Position.Left}
          id="execIn"
          isConnectable={isConnectable}
          className="w-4 h-4 bg-[#e2e8f0] border-2 border-[#13131f] -ml-2"
          style={{ top: '16px', borderRadius: '4px' }}
        />
      )}
      
      {/* Execution Out Handle (Right) */}
      {config.execOut && (
        <Handle
          type="source"
          position={Position.Right}
          id="execOut"
          isConnectable={isConnectable}
          className="w-4 h-4 bg-[#e2e8f0] border-2 border-[#13131f] -mr-2"
          style={{ top: '16px', borderRadius: '4px' }}
        />
      )}

      {/* Header */}
      <div className="px-3 py-1.5 border-b border-[#2e2e3e] flex items-center justify-between" style={{ backgroundColor: `${color}40` }}>
        <strong className="text-[#e2e8f0] font-semibold tracking-tight">{data.label || data.type}</strong>
      </div>
      
      {/* Body */}
      <div className="flex px-1 py-2">
        {/* Left Column: Data Inputs */}
        <div className="flex flex-col gap-2 flex-1">
          {config.inputs.map((input, index) => (
            <div key={input.id} className="flex items-center relative h-6 pl-2 pr-4">
              {/* Data In Handle */}
              <Handle
                type="target"
                position={Position.Left}
                id={`dataIn_${input.id}`}
                isConnectable={isConnectable}
                className="w-3 h-3 bg-[#94a3b8] border border-[#13131f] -ml-2.5 rounded-full"
                style={{ top: '50%' }}
              />
              <span className="text-[#94a3b8] text-[10px] uppercase font-bold mr-2 w-16">{input.label}</span>
              <input 
                type="text" 
                className="bg-[#13131f] border border-[#2e2e3e] rounded px-1.5 py-0.5 text-[#e2e8f0] text-xs w-20 outline-none focus:border-[#6366f1]"
                placeholder="..."
                value={data[input.id] || ''}
                onChange={(e) => handleInputChange(e, input.id)}
              />
            </div>
          ))}
        </div>

        {/* Right Column: Branching Execs & Data Outputs */}
        <div className="flex flex-col gap-2 items-end justify-start min-w-[60px]">
          {config.branches.map((branch, index) => (
            <div key={branch.id} className="flex items-center justify-end relative h-6 pr-2 pl-4">
              <span className="text-[#e2e8f0] text-[10px] uppercase font-bold mr-1">{branch.label}</span>
              {/* Branch Exec Out Handle */}
              <Handle
                type="source"
                position={Position.Right}
                id={`branchOut_${branch.id}`}
                isConnectable={isConnectable}
                className="w-4 h-4 bg-[#6366f1] border-2 border-[#13131f] -mr-2.5"
                style={{ borderRadius: '4px', top: '50%' }}
              />
            </div>
          ))}
          
          {config.outputs.map((output, index) => (
            <div key={output.id} className="flex items-center justify-end relative h-6 pr-2 pl-4">
              <span className="text-[#94a3b8] text-[10px] uppercase font-bold mr-1">{output.label}</span>
              {/* Data Out Handle */}
              <Handle
                type="source"
                position={Position.Right}
                id={`dataOut_${output.id}`}
                isConnectable={isConnectable}
                className="w-3 h-3 bg-[#94a3b8] border border-[#13131f] -mr-2.5 rounded-full"
                style={{ top: '50%' }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
