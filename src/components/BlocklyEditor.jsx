import React, { useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from 'react';
import * as Blockly from 'blockly';
import { registerBlocks, traverseBlock } from '../blockly/blocks';
import blocklyDarkTheme from '../blockly/theme';
import toolboxConfig from '../blockly/toolbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const BlocklyEditor = forwardRef(function BlocklyEditor({ onCodeChange, flyoutOpen, onManualReview }, ref) {
  const containerRef = useRef(null);
  const workspaceRef = useRef(null);

  // Expose workspace + category selection to parent
  useImperativeHandle(ref, () => ({
    getWorkspace: () => workspaceRef.current,

    selectCategory: (index) => {
      const ws = workspaceRef.current;
      if (!ws) return;
      const toolbox = ws.getToolbox();
      if (!toolbox) return;
      const items = toolbox.getToolboxItems();
      if (items && items[index]) {
        toolbox.setSelectedItem(items[index]);
      }
    },

    clearCategory: () => {
      const ws = workspaceRef.current;
      if (!ws) return;
      const toolbox = ws.getToolbox();
      if (toolbox) {
        // 1. Clear the active category selection natively
        toolbox.clearSelection();

        // 2. Explicitly force the toolbox's flyout (and its scrollbar) to hide
        const flyout = toolbox.getFlyout();
        if (flyout) {
          flyout.hide();
        }
      }
    },

    clearWorkspace: () => {
      const ws = workspaceRef.current;
      if (ws) ws.clear();
    },
  }));

  // Code change handler
  const handleWorkspaceChange = useCallback(() => {
    const ws = workspaceRef.current;
    if (!ws) return;
    const lines = [];
    ws.getTopBlocks(true).forEach(block => traverseBlock(block, lines));
    const code = lines.join('\n');
    onCodeChange?.(code);
  }, [onCodeChange]);

  useEffect(() => {
    // Register block definitions before injection
    registerBlocks();

    // Inject Blockly workspace
    const workspace = Blockly.inject(containerRef.current, {
      toolbox: toolboxConfig,
      trashcan: true,
      theme: blocklyDarkTheme,
      grid: { spacing: 20, length: 3, colour: '#2e2e3e', snap: true },
      zoom: { controls: true, wheel: true, startScale: 0.85 },
      scrollbars: true,
      move: { scrollbars: true, drag: true, wheel: true },
    });

    workspaceRef.current = workspace;

    // Listen for changes
    workspace.addChangeListener(handleWorkspaceChange);

    // ResizeObserver for responsive sizing
    const observer = new ResizeObserver(() => {
      Blockly.svgResize(workspace);
    });
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Initial resize
    Blockly.svgResize(workspace);

    // Programmatically hide native toolbox after injection.
    // Blockly v12 uses .blocklyToolbox (not .blocklyToolboxDiv).
    // Inject a <style> tag directly (bypasses Tailwind CSS layers) for max specificity.
    const styleId = 'blockly-toolbox-hide';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        /* Hide native toolbox */
        .blocklyToolbox {
          width: 0px !important;
          min-width: 0px !important;
          max-width: 0px !important;
          overflow: hidden !important;
          opacity: 0 !important;
          pointer-events: none !important;
          padding: 0 !important;
          border: none !important;
        }
        
        /* FIX: Prevent Tailwind from forcing hidden Blockly SVGs to display */
        svg[display="none"] {
          display: none !important;
        }
      `;
      document.head.appendChild(style);
    }

    // Also apply inline styles for absolute certainty
    const hideToolbox = () => {
      document.querySelectorAll('.blocklyToolbox').forEach(el => {
        el.style.cssText = 'width:0!important;min-width:0!important;max-width:0!important;overflow:hidden!important;opacity:0!important;pointer-events:none!important;padding:0!important;border:none!important;';
      });
    };

    hideToolbox();
    setTimeout(() => { hideToolbox(); Blockly.svgResize(workspace); }, 100);
    setTimeout(() => { hideToolbox(); Blockly.svgResize(workspace); }, 300);

    return () => {
      observer.disconnect();
      workspace.removeChangeListener(handleWorkspaceChange);
      workspace.dispose();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="relative flex-1 h-full" style={{ minWidth: 0 }}>
      <div
        ref={containerRef}
        className="absolute inset-0"
        data-flyout-open={flyoutOpen ? 'true' : 'false'}
      />
      {/* TODO: Replace this button with Mascot avatar eventually */}
      <div className="absolute bottom-6 right-20 z-10 bg-[#1a1a28] p-1 rounded border border-[#2e2e3e] shadow-lg pointer-events-auto">
        <Tooltip title="AI Help/Verify" arrow placement="top">
          <IconButton onClick={onManualReview} size="medium" sx={{ color: '#818cf8', '&:hover': { bgcolor: '#818cf820' } }}>
            <AutoAwesomeIcon />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
});

export default BlocklyEditor;