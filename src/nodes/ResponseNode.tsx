import type { NodeProps } from "reactflow";
import { Handle, Position } from "reactflow";
import { useState } from "react";

import "../css/response-node.css";

export type ResponseNodeData = {
  prompt: string;
};

export default function ResponseNode({ data, isConnectable }: NodeProps<ResponseNodeData>) {
  const [response, setResponse] = useState("");

  return (
    <div className="response-node">
      <div>
        <label htmlFor="text">Response:</label>
      </div>
      <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
    </div>
  );
}
