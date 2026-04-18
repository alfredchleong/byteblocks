import React, { useState } from 'react';
import BoltIcon from '@mui/icons-material/Bolt';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import DataObjectIcon from '@mui/icons-material/DataObject';
import CalculateIcon from '@mui/icons-material/Calculate';
import StorageIcon from '@mui/icons-material/Storage';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TokenIcon from '@mui/icons-material/Token';
import LinkIcon from '@mui/icons-material/Link';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import Tooltip from '@mui/material/Tooltip';

const NODE_CATEGORIES = [
  {
    title: 'Events & Entry Points',
    color: '#E6007A',
    icon: <BoltIcon fontSize="small" />,
    nodes: [
      { type: 'when_contract_starts', label: 'When Contract Starts' },
      { type: 'when_tx_received', label: 'When TX Received' },
      { type: 'when_event_emitted', label: 'When Event Emitted' },
    ]
  },
  {
    title: 'Control Flow',
    color: '#6D3AEE',
    icon: <AltRouteIcon fontSize="small" />,
    nodes: [
      { type: 'if_do', label: 'If...Then' },
      { type: 'if_do_else', label: 'If...Then...Else' },
      { type: 'repeat_do', label: 'Repeat' },
      { type: 'while_do', label: 'While' },
      { type: 'return_value', label: 'Return' },
      { type: 'require', label: 'Require' },
    ]
  },
  {
    title: 'Variables & Data',
    color: '#00B2FF',
    icon: <DataObjectIcon fontSize="small" />,
    nodes: [
      { type: 'set_variable', label: 'Set Variable' },
      { type: 'change_variable', label: 'Change Variable' },
      { type: 'show_variable', label: 'Show Variable' },
      { type: 'hide_variable', label: 'Hide Variable' },
      { type: 'define_function', label: 'Define Function' },
      { type: 'call_function', label: 'Call Function' },
    ]
  },
  {
    title: 'Math & Logic',
    color: '#08C168',
    icon: <CalculateIcon fontSize="small" />,
    nodes: [
      { type: 'math_number', label: 'Number' },
      { type: 'math_add', label: 'Add (+)' },
      { type: 'math_subtract', label: 'Subtract (-)' },
      { type: 'math_multiply', label: 'Multiply (*)' },
      { type: 'math_divide', label: 'Divide (/)' },
      { type: 'math_sqrt', label: 'Square Root' },
      { type: 'math_min', label: 'Min' },
      { type: 'math_compare', label: 'Compare' },
      { type: 'logic_and', label: 'And' },
      { type: 'logic_or', label: 'Or' },
      { type: 'logic_not', label: 'Not' },
      { type: 'math_random', label: 'Random' },
      { type: 'last_minted_token_id', label: 'lastMintedTokenId' },
    ]
  },
  {
    title: 'Contract Storage',
    color: '#FF8C00',
    icon: <StorageIcon fontSize="small" />,
    nodes: [
      { type: 'storage_store', label: 'Store Key' },
      { type: 'storage_read', label: 'Read Key' },
      { type: 'storage_delete', label: 'Delete Key' },
    ]
  },
  {
    title: 'Chain Interaction',
    color: '#FF5E5E',
    icon: <LinkIcon fontSize="small" />,
    nodes: [
      { type: 'chain_call', label: 'Call Contract' },
      { type: 'chain_instantiate', label: 'Instantiate Contract' },
      { type: 'chain_query', label: 'Query Chain' },
    ]
  },
  {
    title: 'Token & Balance',
    color: '#9966FF',
    icon: <AccountBalanceWalletIcon fontSize="small" />,
    nodes: [
      { type: 'send_tokens', label: 'Send Tokens' },
      { type: 'receive_tokens', label: 'Receive Tokens' },
      { type: 'get_balance', label: 'Get Balance' },
    ]
  },
  {
    title: 'Token Management',
    color: '#FF00AA',
    icon: <TokenIcon fontSize="small" />,
    nodes: [
      { type: 'mint_tokens', label: 'Mint Tokens' },
      { type: 'burn_tokens', label: 'Burn Tokens' },
      { type: 'approve_allowance', label: 'Approve Allowance' },
      { type: 'transfer_from', label: 'Transfer From' },
      { type: 'get_allowance', label: 'Get Allowance' },
    ]
  },
  {
    title: 'Events',
    color: '#FFA500',
    icon: <NotificationsActiveIcon fontSize="small" />,
    nodes: [
      { type: 'emit_event', label: 'Emit Event' },
    ]
  },
  {
    title: 'Wallet & TX',
    color: '#E6007A',
    icon: <AccountBalanceWalletIcon fontSize="small" />,
    nodes: [
      { type: 'open_wallet', label: 'Open Wallet' },
      { type: 'sign_transaction', label: 'Sign Transaction' },
      { type: 'broadcast_transaction', label: 'Broadcast Transaction' },
      { type: 'on_tx_confirmed', label: 'On TX Confirmed' },
    ]
  },
  {
    title: 'AMM',
    color: '#D65C5C',
    icon: <CurrencyExchangeIcon fontSize="small" />,
    nodes: [
      { type: 'add_liquidity', label: 'Add Liquidity' },
      { type: 'remove_liquidity', label: 'Remove Liquidity' },
      { type: 'swapAforB', label: 'Swap A for B' },
      { type: 'swapBforA', label: 'Swap B for A' },
    ]
  },
  {
    title: 'Text',
    color: '#00B2FF',
    icon: <TextFieldsIcon fontSize="small" />,
    nodes: [
      { type: 'text_literal', label: 'Text' },
      { type: 'text_join', label: 'Join Text' },
      { type: 'msg_sender', label: 'msg.sender' },
    ]
  }
];

export default function NodeToolbox() {
  const [activeCategory, setActiveCategory] = useState<string | null>(NODE_CATEGORIES[0].title);

  const onDragStart = (event: React.DragEvent, nodeType: string, nodeLabel: string) => {
    event.dataTransfer.setData('application/reactflow/type', nodeType);
    event.dataTransfer.setData('application/reactflow/label', nodeLabel);
    event.dataTransfer.effectAllowed = 'move';
  };

  const currentCategoryData = NODE_CATEGORIES.find(c => c.title === activeCategory);

  return (
    <div className="flex h-full shrink-0 select-none transition-all z-10" style={{ boxShadow: '2px 0 8px rgba(0,0,0,0.2)' }}>
      {/* Icon Category Bar (Left) */}
      <div className="w-14 bg-[#1a1a28] border-r border-[#2e2e3e] flex flex-col items-center py-2 h-full gap-2">
        {NODE_CATEGORIES.map((category) => (
          <Tooltip key={category.title} title={category.title} placement="right">
            <div 
              onClick={() => setActiveCategory(activeCategory === category.title ? null : category.title)}
              className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all hover:bg-[#2e2e3e]"
              style={{ 
                color: '#e2e8f0', 
                backgroundColor: activeCategory === category.title ? category.color : 'transparent',
                boxShadow: activeCategory === category.title ? `0 0 10px ${category.color}80` : 'none'
              }}
            >
              {category.icon}
            </div>
          </Tooltip>
        ))}
      </div>

      {/* Expandable Tools Flyout (Right) */}
      {activeCategory && currentCategoryData && (
        <div className="w-56 bg-[#1e1e2d] border-r border-[#2e2e3e] flex flex-col h-full animate-in slide-in-from-left-2 duration-200">
          <div className="p-3 border-b border-[#2e2e3e]" style={{ borderBottomColor: currentCategoryData.color }}>
            <h2 className="text-[#e2e8f0] font-semibold tracking-tight text-sm uppercase flex items-center gap-2">
              <span style={{ color: currentCategoryData.color }}>{currentCategoryData.icon}</span>
              {currentCategoryData.title}
            </h2>
          </div>

          <div className="p-3 flex flex-col gap-2 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
            {currentCategoryData.nodes.map((n) => (
              <div
                key={n.type}
                className="px-3 py-2 rounded text-xs font-medium tracking-tight cursor-grab active:cursor-grabbing hover:brightness-110 transition-all shadow-sm border border-[#2e2e3e]"
                style={{ 
                  backgroundColor: `${currentCategoryData.color}20`, 
                  borderColor: currentCategoryData.color, 
                  color: '#e2e8f0',
                  borderLeftWidth: '4px'
                }}
                draggable
                onDragStart={(e) => onDragStart(e, n.type, n.label)}
              >
                {n.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
