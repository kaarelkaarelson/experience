import type { Node, NodeTypes } from "reactflow";
import { PositionLoggerNode } from "./PositionLoggerNode";
import { useCallback, useEffect, useState } from "react";
import PromptNode from "./PromptNode";
import ResponseNode from "./ResponseNode";

export const nodeTypes = {
  "prompt-node": PromptNode,
  "response-node": ResponseNode,
} satisfies NodeTypes;

export const initialNodes = [{ id: "node-1", type: "prompt-node", position: { x: 0, y: 0 }, data: {} }];
