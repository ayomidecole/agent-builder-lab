import { Agent, AgentOutputType, run } from "@openai/agents"

type RunAgentOptions<TOutput extends AgentOutputType> = {
    agent: Agent<unknown, TOutput>
    input: string
}

export async function runAgent<TOutput extends AgentOutputType>(options: RunAgentOptions<TOutput>) {
    const result = await run(options.agent, options.input)
    return result.finalOutput
}

export default runAgent
