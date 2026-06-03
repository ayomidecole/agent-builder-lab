import { Agent, AgentOutputType, run } from "@openai/agents"
import { writeTrace } from "../tracing/writeTrace.js"

type RunAgentOptions<TOutput extends AgentOutputType> = {
    agent: Agent<unknown, TOutput>
    input: string
}

export async function runAgent<TOutput extends AgentOutputType>(options: RunAgentOptions<TOutput>) {
    const startedAt = new Date()

    try {
        const result = await run(options.agent, options.input)
        const endedAt = new Date()

        await writeTrace({
            agentName: options.agent.name,
            input: options.input,
            startedAt: startedAt.toISOString(),
            endedAt: endedAt.toISOString(),
            durationMs: endedAt.getTime() - startedAt.getTime(),
            status: "success",
            output: result.finalOutput
        })

        return result.finalOutput
        
    } catch (error) {
        const endedAt = new Date()

        const errorMessage = error instanceof Error ? error.message : String(error)

        await writeTrace({
            agentName: options.agent.name,
            input: options.input,
            startedAt: startedAt.toISOString(),
            endedAt: endedAt.toISOString(),
            durationMs: endedAt.getTime() - startedAt.getTime(),
            status: "error",
            error: errorMessage
        })

        throw error
    }
}

export default runAgent
