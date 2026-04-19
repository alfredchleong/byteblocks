import React, { useState } from 'react';

export default function OutputPanel({
  code,
  isCompiling,
  isDeploying,
  onCompile,
  onDeploy,
}) {

  return (
    <div className="flex flex-col w-[320px] shrink-0 bg-[#16161f] border-l border-[#2e2e3e] overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#2e2e3e] shrink-0">
        <span className="text-[10px] font-mono text-[#64748b] uppercase tracking-widest">&lt;&gt;</span>
        <span className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wider">Output</span>
      </div>

      {/* Code output area */}
      <div className="flex-1 overflow-y-auto px-4 py-3 min-h-0">
        {code ? (
          <pre className="text-xs font-mono text-[#e2e8f0] leading-relaxed whitespace-pre-wrap break-words">
            {code}
          </pre>
        ) : (
          <p className="text-xs font-mono text-[#64748b] italic leading-relaxed">
            Drag blocks to the workspace to see output…
          </p>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex flex-col gap-2 px-4 py-3 border-t border-[#2e2e3e] shrink-0">
        <button
          id="compile-btn"
          onClick={onCompile}
          disabled={isCompiling}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-150 cursor-pointer border-none outline-none"
          style={{
            background: isCompiling
              ? 'linear-gradient(135deg, #4a4ab0, #5a5ac0)'
              : 'linear-gradient(135deg, #6366f1, #818cf8)',
            opacity: isCompiling ? 0.7 : 1,
          }}
        >
          {isCompiling ? (
            <>
              <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Compiling…
            </>
          ) : (
            <>
              Compile
            </>
          )}
        </button>

        <button
          id="deploy-btn"
          onClick={onDeploy}
          disabled={isDeploying}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-150 cursor-pointer border-none outline-none"
          style={{
            background: isDeploying
              ? 'linear-gradient(135deg, #1c5c3a, #226b46)'
              : 'linear-gradient(135deg, #059669, #10b981)',
            opacity: isDeploying ? 0.7 : 1,
          }}
        >
          {isDeploying ? (
            <>
              <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Deploying…
            </>
          ) : (
            <>
              Deploy
            </>
          )}
        </button>
      </div>
    </div>
  );
}
