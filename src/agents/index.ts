import { OpenAI } from "@langchain/openai";
import { ConversationChain } from "langchain/chains";
import { PromptTemplate } from "@langchain/core/prompts";
import { UserContext } from "../nodes/PromptNode";

const openAIApiKey = import.meta.env.VITE_OPENAI_API_KEY;

const openai = new OpenAI({
  openAIApiKey: openAIApiKey,
  temperature: 0.9,
  model: "gpt-3.5-turbo",
});

const chain = new ConversationChain({ llm: openai });

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
    const response = await chain.call({ input: formattedPrompt });
    console.log(response.response);
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
}
