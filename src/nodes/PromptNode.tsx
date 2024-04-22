import { Context, useCallback } from "react";
import type { NodeProps } from "reactflow";
import { Handle, Position } from "reactflow";
import { useState } from "react";
import { Node } from "reactflow";

import "../css/prompt-node.css";
import { getCurriculum } from "../agents";
import ResponseNode from "./ResponseNode";

export type PromptNodeData = {
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
};

export type UserContext = {
  topic: string;
  background: string;
  goal: string;
};

export default function PromptNode({ data, isConnectable }: NodeProps<PromptNodeData>) {
  const [topic, setTopic] = useState("");
  const [background, setBackground] = useState("");
  const [goal, setGoal] = useState("");
  const [stats, setStats] = useState({});

  const onClick = useCallback(async (evt) => {
    const plan = await getCurriculum(stats as UserContext);
    const response = plan?.response as string;

    console.log(plan);
    const newNode = ResponseNode({ response });

    // data.setNodes((prevNodes) => [...prevNodes, newNode] as Node[]);
  }, []);

  const onTopicChange = useCallback((evt) => {
    setTopic(evt.target.value);
    setStats((prevStats) => ({ ...prevStats, topic: evt.target.value }));
  }, []);

  const onBackgroundChange = useCallback((evt) => {
    setBackground(evt.target.value);
    setStats((prevStats) => ({ ...prevStats, background: evt.target.value }));
  }, []);

  const onGoalChange = useCallback((evt) => {
    setGoal(evt.target.value);
    setStats((prevStats) => ({ ...prevStats, goal: evt.target.value }));
  }, []);

  return (
    <div className="prompt-node">
      <div>
        <label htmlFor="topic">Topic you're interested in:</label>
        <input id="topic" name="text" onChange={onTopicChange} className="nodrag" placeholder="Topic" />
        <label htmlFor="background">Describe your background:</label>
        <input id="background" name="backgroudn" onChange={onBackgroundChange} className="nodrag" placeholder="Background" />
        <label htmlFor="goal">Learning goal:</label>
        <input id="goal" name="goal" onChange={onGoalChange} className="nodrag" placeholder="Goal" />
      </div>
      <button onClick={onClick}>experience</button>
      <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
    </div>
  );
}
