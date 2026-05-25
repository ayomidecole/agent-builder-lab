import { runAgent } from "./harness/runAgent.js"
import agentBuilderV0 from "./agents/agentBuilderAgent.js"

if (!process.env.OPENAI_API_KEY) {
    console.error("Missing OPENAI_API_KEY. Export it before running npm run agent-builder.")
    process.exit(1)
}

const input = "I want to create a slack agent that sends me a message daily with my email briefs"

const output = await runAgent({
    agent: agentBuilderV0,
    input
})

console.log(output)
