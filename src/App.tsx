import type { OnConnect } from "reactflow";
import type { Node, NodeTypes } from "reactflow";

import {
  Background,
  Controls,
  ControlButton,
  MiniMap,
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
} from "reactflow";
import { initialEdges, edgeTypes } from "./edges";
import { FaceIcon, ImageIcon, SunIcon } from "@radix-ui/react-icons";
import { PositionLoggerNode } from "./nodes/PositionLoggerNode";
import { useCallback, useEffect, useState } from "react";
import "reactflow/dist/style.css";
import "./css/text-updater-node.css";

const rfStyle = {
  backgroundColor: "#000000",
};

const handleStyle = { left: 10 };
const initialNodes = [{ id: "node-1", type: "textUpdater", position: { x: 0, y: 0 }, data: { value: 123 } }];

const nodeTypes = { textUpdater: PromptNode };

export const createNode = () => {
  return {
    id: `node-${Math.random().toString(36).substr(2, 9)}`,
    type: "text-updater",
    position: { x: 0, y: 0 },
    data: { label: "New Node" },
  } satisfies Node;
};

function PromptNode({ data, isConnectable }) {
  const [prompt, setPrompt] = useState("");

  const divStyle = {
    position: "relative",
  };

  const buttonStyle = {
    position: "absolute",
    right: 0,
  };

  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
    setPrompt(evt.target.value);
  }, []);

  const onClick = useCallback(
    (evt) => {
      console.log("clicked", prompt);
    },
    [prompt]
  );

  return (
    <div className="text-updater-node">
      <div>
        <label htmlFor="text">Prompt:</label>
        <input id="text" name="text" onChange={onChange} className="nodrag" />
      </div>
      <div style={divStyle}>
        <button style={buttonStyle} onClick={onClick}>
          query
        </button>
      </div>
      <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
    </div>
  );
}

export default function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState([]);

  const addNewNode = () => {
    const newNode = createNode();
    setNodes([...nodes, newNode]);
  };

  const onNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), [setNodes]);
  const onEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), [setEdges]);
  const onConnect = useCallback((connection) => setEdges((eds) => addEdge(connection, eds)), [setEdges]);

  return (
    <ReactFlow
      nodes={nodes}
      nodeTypes={nodeTypes}
      edges={edges}
      onNodesChange={onNodesChange}
      edgeTypes={edgeTypes}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      style={rfStyle}
    >
      <Background />
      <MiniMap />
      <Controls position="bottom-left">
        <ControlButton onClick={addNewNode}>
          <FaceIcon />
        </ControlButton>
      </Controls>
    </ReactFlow>
  );
}
