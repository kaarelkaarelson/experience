import { Background, Controls, MiniMap, ReactFlow, addEdge, applyEdgeChanges, applyNodeChanges } from "reactflow";
import { initialEdges, edgeTypes, satisfies } from "./edges";
import { useCallback, useEffect, useState } from "react";
import { OpenAI } from "@langchain/openai";
import { ConversationChain } from "langchain/chains";
import ResponseNode from "./nodes/ResponseNode";
import PromptNode from "./nodes/ResponseNode";
import { nodeTypes, initialNodes } from "./nodes";

import "reactflow/dist/style.css";

const openAIApiKey = import.meta.env.VITE_OPENAI_API_KEY;

const rfStyle = {
  backgroundColor: "#000000",
};

// const openai = new OpenAI({
//   openAIApiKey: openAIApiKey,
//   temperature: 0.9,
//   model: "gpt-3.5-turbo",
// });

// const chain = new ConversationChain({ llm: openai });

export default function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState([]);

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
      <Controls position="bottom-left"></Controls>
    </ReactFlow>
  );
}
