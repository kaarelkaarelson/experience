import { OpenAI, ChatOpenAI } from "@langchain/openai";
import { ConversationChain, LLMChain } from "langchain/chains";
import { createToolCallingAgent, AgentExecutor } from "langchain/agents";
import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import * as hub from "langchain/hub";
import { StructuredToolInterface } from "@langchain/core/tools";

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

// const chain = new ConversationChain({ llm: llm });

const coursePromptTemplate = PromptTemplate.fromTemplate(`
    Generate a personal learning course about {topic}. \n \
    Pick out 3 exercises \n \
    Make it personalized by considering users's background: {background} \n \
    Adjust it to follow user's learning goal: {goal} \n`);

export async function getCoursePlan({ topic, background, goal }: UserContext) {
  console.log(topic, background, goal);

  const formattedPrompt = await coursePromptTemplate.format({ topic: topic, background: background, goal: goal });

  console.log(formattedPrompt);

  try {
    const response = await agent_executor.invoke({ input: formattedPrompt });

    console.log(response.response);
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
}

const plan = await getCoursePlan({
  topic: "Exponential growth",
  background: "CS undergrad",
  goal: "Learn more how this concept relates to economics",
});

console.log(plan);
