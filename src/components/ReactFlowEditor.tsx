import React, { useCallback, useEffect, useRef, forwardRef, useImperativeHandle, useState } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  Background,
  BackgroundVariant,
  Panel,
  useReactFlow
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { generateFlowCode } from '../reactflow/parser';
import LogicNode from '../reactflow/nodes/LogicNode';
import NodeToolbox from '../reactflow/NodeToolbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const nodeTypes = {
  logic: LogicNode,
};

let id = 0;
const getId = () => `dndnode_${id++}`;

const ReactFlowCanvas = forwardRef(({ onCodeChange, hidden }, ref) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  const firstRender = useRef(true);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const clearWorkspace = useCallback(() => {
    setNodes([]);
    setEdges([]);
  }, [setNodes, setEdges]);

  useImperativeHandle(ref, () => ({
    clearWorkspace,
  }));

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow/type');
      const label = event.dataTransfer.getData('application/reactflow/label');

      if (!type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: getId(),
        type: 'logic',
        position,
        data: { type, label },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, setNodes]
  );

  useEffect(() => {
    if (!hidden) {
      const code = generateFlowCode(nodes, edges);
      onCodeChange?.(code);
    }
  }, [nodes, edges, hidden, onCodeChange]);

  useEffect(() => {
    if (!hidden && firstRender.current) {
      firstRender.current = false;
      const code = generateFlowCode(nodes, edges);
      onCodeChange?.(code);
    }
  }, [hidden, nodes, edges, onCodeChange]);

  return (
    <div
      className="flex-1 h-full relative flex"
      style={{
        display: hidden ? 'none' : 'flex',
        minWidth: 0,
        backgroundColor: '#13131f'
      }}
    >
      <NodeToolbox />
      <div className="flex-1 h-full relative" ref={ref}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDragOver={onDragOver}
          onDrop={onDrop}
          nodeTypes={nodeTypes}
          fitView
          className="react-flow-dark-theme"
          colorMode="dark"
          deleteKeyCode={['Backspace', 'Delete']}
        >
          <Controls />
          <Background variant={BackgroundVariant.Dots} gap={16} size={1} color="#2e2e3e" />
          
          <Panel position="top-right" className="bg-[#1a1a28] p-1 rounded border border-[#2e2e3e] shadow-lg flex items-center gap-2">
            <span className="text-[10px] text-[#94a3b8] ml-2 select-none">Select node & press Delete to remove</span>
            <Tooltip title="Clear All Nodes" arrow placement="bottom">
              <IconButton onClick={clearWorkspace} size="small" sx={{ color: '#ef4444', '&:hover': { bgcolor: '#ef444420' } }}>
                <DeleteOutlineIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </Tooltip>
          </Panel>
        </ReactFlow>
      </div>
    </div>
  );
});

// We wrap the exported component in ReactFlowProvider so useReactFlow hooks work inside ReactFlowCanvas
const ReactFlowEditor = forwardRef((props, ref) => {
  return (
    <ReactFlowProvider>
      <ReactFlowCanvas {...props} ref={ref} />
    </ReactFlowProvider>
  );
});

export default ReactFlowEditor;
