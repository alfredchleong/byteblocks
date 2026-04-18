import { generateFlowCode } from './parser.js';

const nodes = [
  // Root Event
  { id: 'n1', data: { type: 'when_contract_starts' } },
  
  // Set Variable
  { id: 'n2', data: { type: 'set_variable', VAR_NAME: 'total' } },
  
  // Data node (Number) plugged into Set Variable
  { id: 'n3', data: { type: 'math_number', NUM: '100' } },
  
  // If...Then...Else Branch
  { id: 'n4', data: { type: 'if_do_else' } },
  
  // Condition for If
  { id: 'n5', data: { type: 'math_compare' } },
  
  // Data nodes for Condition
  { id: 'n6', data: { type: 'storage_read', KEY: '"balance"' } },
  { id: 'n7', data: { type: 'math_number', NUM: '50' } },
  
  // Then Branch: Send Tokens
  { id: 'n8', data: { type: 'send_tokens', AMOUNT: '10', TO: '"0x123"' } },
  
  // Else Branch: Emit Event
  { id: 'n9', data: { type: 'emit_event', EVENT_NAME: 'Error', PARAMS: '"Insufficient Funds"' } },
  
  // Next node after If
  { id: 'n10', data: { type: 'return_value', VALUE: 'true' } }
];

const edges = [
  // Execution Flow
  { source: 'n1', sourceHandle: 'execOut', target: 'n2', targetHandle: 'execIn' },
  { source: 'n2', sourceHandle: 'execOut', target: 'n4', targetHandle: 'execIn' },
  { source: 'n4', sourceHandle: 'execOut', target: 'n10', targetHandle: 'execIn' }, // This connects AFTER the if statement in visual terms, wait, if_do_else doesn't have an execOut in my config?
  
  // Branch Flow
  { source: 'n4', sourceHandle: 'branchOut_THEN', target: 'n8', targetHandle: 'execIn' },
  { source: 'n4', sourceHandle: 'branchOut_ELSE', target: 'n9', targetHandle: 'execIn' },
  
  // Data Flow
  // Plug 100 into set_variable's VALUE
  { source: 'n3', sourceHandle: 'dataOut_RESULT', target: 'n2', targetHandle: 'dataIn_VALUE' },
  
  // Plug Compare into If Condition
  { source: 'n5', sourceHandle: 'dataOut_RESULT', target: 'n4', targetHandle: 'dataIn_CONDITION' },
  
  // Plug Read and 50 into Compare's A and B
  { source: 'n6', sourceHandle: 'dataOut_RESULT', target: 'n5', targetHandle: 'dataIn_A' },
  { source: 'n7', sourceHandle: 'dataOut_RESULT', target: 'n5', targetHandle: 'dataIn_B' }
];

const expectedCode = `▶️ when contract starts
set variable total to (100)
if read key "balance" = 50 then
  send 10 tokens to "0x123"
else
  emit event Error ("Insufficient Funds")
end
return true`;

const result = generateFlowCode(nodes as any, edges as any);

console.log("=== Generated Code ===");
console.log(result);
console.log("======================");

if (result.trim() === expectedCode.trim()) {
  console.log("✅ TEST PASSED: Generated code perfectly matches expected pseudo-code.");
  process.exit(0);
} else {
  console.error("❌ TEST FAILED:");
  console.error("Expected:\n" + expectedCode);
  console.error("\nGot:\n" + result);
  process.exit(1);
}
