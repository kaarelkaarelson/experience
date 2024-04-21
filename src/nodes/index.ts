import type { Node, NodeTypes } from "reactflow";
import { PositionLoggerNode } from "./PositionLoggerNode";
import { useCallback, useEffect, useState } from "react";

export const nodeTypes = {
  "position-logger": PositionLoggerNode,
} satisfies NodeTypes;

export const createNode = () => {
  // const [prompt, setPrompt] = useState("");

  return {
    id: `node-${Math.random().toString(36).substr(2, 9)}`,
    type: "input",
    position: { x: 0, y: 0 },
    data: { label: "New Node" },
  } satisfies Node;
};
