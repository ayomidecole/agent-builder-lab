import { run } from "@openai/agents"
import agentBuilderV0 from "./agents/agentBuilderAgent.ts"

if (!process.env.OPENAI_API_KEY) {
    console.error("Missing OPENAI_API_KEY. Export it before running npm run agent-builder.")
    process.exit(1)
}

const result = await run(agentBuilderV0, "I want to create a slack agent that sends me a message daily with my email briefs")

console.log(result.finalOutput)