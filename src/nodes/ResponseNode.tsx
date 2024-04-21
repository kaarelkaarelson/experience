import type { NodeProps } from "reactflow";
import { Handle, Position } from "reactflow";
import { useState } from "react";
import { Node } from "reactflow";

import "../css/response-node.css";
import { satisfies } from ".";

export type ResponseNodeData = {
  response: string;
};

export default function ResponseNode({ response }: ResponseNodeData) {
  return (
    <div className="response-node">
      <div>
        <label htmlFor="text">Response:</label>
        <p id="text">{response}</p>
      </div>
      <Handle type="source" position={Position.Bottom} id="b" />
    </div>
  ) satisfies Node;
}
