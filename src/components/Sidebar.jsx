import React from 'react';
import Tooltip from '@mui/material/Tooltip';

// MUI Icons — one per category
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import DataObjectOutlinedIcon from '@mui/icons-material/DataObjectOutlined';
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import TollOutlinedIcon from '@mui/icons-material/TollOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import WalletIcon from '@mui/icons-material/Wallet';
import SwapHorizOutlinedIcon from '@mui/icons-material/SwapHorizOutlined';
import TextFieldsOutlinedIcon from '@mui/icons-material/TextFieldsOutlined';
import ExtensionOutlinedIcon from '@mui/icons-material/ExtensionOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

// Map category index → icon component + colour
const CATEGORY_META = [
  { icon: PlayCircleOutlineIcon,           colour: '#E6007A', label: 'Events & Entry Points' },
  { icon: AccountTreeOutlinedIcon,         colour: '#6D3AEE', label: 'Control Flow' },
  { icon: DataObjectOutlinedIcon,          colour: '#00B2FF', label: 'Variables & Data' },
  { icon: CalculateOutlinedIcon,           colour: '#08C168', label: 'Math & Logic' },
  { icon: StorageOutlinedIcon,             colour: '#FF8C00', label: 'Contract Storage' },
  { icon: LinkOutlinedIcon,                colour: '#FF5E5E', label: 'Chain Interaction' },
  { icon: AccountBalanceWalletOutlinedIcon,colour: '#9966FF', label: 'Token & Balance' },
  { icon: TollOutlinedIcon,                colour: '#FF00AA', label: 'Token Management' },
  { icon: NotificationsActiveOutlinedIcon, colour: '#FFA500', label: 'Events' },
  { icon: WalletIcon,                      colour: '#E6007A', label: 'Wallet & TX' },
  { icon: SwapHorizOutlinedIcon,           colour: '#D65C5C', label: 'AMM' },
  { icon: TextFieldsOutlinedIcon,          colour: '#00B2FF', label: 'Text' },
];

export default function Sidebar({ activeIndex, onCategoryClick }) {
  return (
    <div className="flex flex-col items-center py-2 bg-[#16161f] border-r border-[#2e2e3e] shrink-0 w-[52px] gap-0.5">
      {CATEGORY_META.map((cat, i) => {
        const Icon = cat.icon;
        const isActive = activeIndex === i;
        return (
          <Tooltip key={i} title={cat.label} arrow placement="right">
            <button
              onClick={() => onCategoryClick(i)}
              className={`
                w-9 h-9 rounded-lg flex items-center justify-center
                transition-all duration-150 cursor-pointer border-none outline-none
                ${isActive
                  ? 'bg-[#22222f] shadow-md'
                  : 'bg-transparent hover:bg-[#1e1e2e]'
                }
              `}
              style={{
                color: isActive ? cat.colour : '#64748b',
              }}
            >
              <Icon sx={{ fontSize: 20 }} />
            </button>
          </Tooltip>
        );
      })}
    </div>
  );
}
