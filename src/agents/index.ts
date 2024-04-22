import { OpenAI, ChatOpenAI } from "@langchain/openai";
import { ConversationChain, LLMChain } from "langchain/chains";
import { createToolCallingAgent, AgentExecutor } from "langchain/agents";
import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import * as hub from "langchain/hub";
import { StructuredToolInterface } from "@langchain/core/tools";
import { ChainValues } from "@langchain/core/utils/types";

import { PromptTemplate, ChatPromptTemplate } from "@langchain/core/prompts";
// import { UserContext } from "../nodes/PromptNode";
console.log("Hello from agents/index.ts");

import dotenv from "dotenv"; // if running in node, otherwise comment out
dotenv.config();
const openAIApiKey = process.env["VITE_OPENAI_API_KEY"]; // If running with tsx
const tavilyApiKey = process.env["VITE_TAVILY_API_KEY"];

// const openAIApiKey = import.meta.env.VITE_OPENAI_API_KEY;
console.log("API KEY:", openAIApiKey);

type UserContext = {
  topic: string;
  background: string;
  goal: string;
};

type getExercisesProps = {
  curriculum: string;
};

const llm = new ChatOpenAI({
  openAIApiKey: openAIApiKey,
  temperature: 0.9,
  model: "gpt-3.5-turbo",
});

const search = new TavilySearchResults({ apiKey: tavilyApiKey });
const tools: StructuredToolInterface[] = [search];
const prompt: ChatPromptTemplate<any> = await hub.pull("hwchase17/openai-functions-agent");

const agent = createToolCallingAgent({ llm, tools, prompt });
const agent_executor = new AgentExecutor({ agent: agent, tools: tools, verbose: true });

const curriculumPrompt = PromptTemplate.fromTemplate(`
    Generate a personal learning course about {topic}. \n \
    Pick out 3 exercises \n \
    Make it personalized by considering users's background: {background} \n \
    Adjust it to follow user's learning goal: {goal} \n`);

const exercisesPrompt = PromptTemplate.fromTemplate(`
    Create 3 concrete interactive exercises and return them as html code \n \
    Make sure each of them adheres to the curriculum: \n
    {curriculum}
    `);

export async function getCurriculum({ topic, background, goal }: UserContext) {
  console.log(topic, background, goal);

  const formattedPrompt = await curriculumPrompt.format({ topic: topic, background: background, goal: goal });

  console.log(formattedPrompt);

  try {
    const response = await agent_executor.invoke({ input: formattedPrompt });

    return response.output as string;
  } catch (error) {
    console.error("Error:", error);
    return "Error";
  }
}

export async function getExercises({ curriculum }: getExercisesProps) {
  const formattedPrompt = await exercisesPrompt.format({ curriculum });

  console.log(formattedPrompt);

  try {
    const response = await agent_executor.invoke({ input: formattedPrompt });

    console.log("This is the RESPONSE: " + response);

    return response.output;
  } catch (error) {
    console.error("Error:", error);
  }
}

const curriculum = await getCurriculum({
  topic: "Exponential growth",
  background: "CS undergrad",
  goal: "Learn more how this concept relates to economics",
});

const exercises = await getExercises({
  curriculum: curriculum,
});

console.log(exercises);
