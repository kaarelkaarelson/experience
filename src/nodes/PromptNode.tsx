import { useCallback } from "react";
import type { NodeProps } from "reactflow";
import { Handle, Position } from "reactflow";
import { useState } from "react";

import "../css/prompt-node.css";

export type PromptNodeData = {};

export default function PromptNode({ data, isConnectable }: NodeProps<PromptNodeData>) {
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
      queryPrompt(prompt);
    },
    [prompt]
  );

  async function queryPrompt(prompt) {
    try {
      // const response = await chain.call({ input: "what's 2+2, give me only the answer" });
      // console.log(response.response);
      //const newNode = ResponseNode({}, {});
      // setNodes([...nodes, newNode]);
      console.log(prompt);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="prompt-node">
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
