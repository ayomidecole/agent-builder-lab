import { Agent, run } from "@openai/agents"

type RunAgentOptions = {
    agent: Agent
    input: string
}

export async function runAgent(options: RunAgentOptions) {
    const agent = options.agent
    const agentInput = options.input
    const result = await run(agent, agentInput)
    
    return result.finalOutput
}

export default runAgent
