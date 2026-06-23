import { Agent, AgentOutputType, run } from "@openai/agents"
import { writeTrace } from "../tracing/writeTrace.js"

type RunAgentOptions<TOutput extends AgentOutputType> = {
    agent: Agent<unknown, TOutput>
    input: string
}

export async function runAgent<TOutput extends AgentOutputType>(options: RunAgentOptions<TOutput>) {
    const startedAt = new Date()
    const shouldWriteLocalTrace = process.env.NODE_ENV !== "production"

    try {
        const result = await run(options.agent, options.input)
        const endedAt = new Date()
        const durationMs = endedAt.getTime() - startedAt.getTime()

        if (shouldWriteLocalTrace) {
            await writeTrace({
                agentName: options.agent.name,
                input: options.input,
                startedAt: startedAt.toISOString(),
                endedAt: endedAt.toISOString(),
                durationMs,
                status: "success",
                output: result.finalOutput
            })
        }

        console.log(JSON.stringify({
            type: "agent_run",
            agentName: options.agent.name,
            status: "success",
            durationMs
        }))

        return result.finalOutput
        
    } catch (error) {
        const endedAt = new Date()
        const durationMs = endedAt.getTime() - startedAt.getTime()

        const errorMessage = error instanceof Error ? error.message : String(error)

        if (shouldWriteLocalTrace) {
            await writeTrace({
                agentName: options.agent.name,
                input: options.input,
                startedAt: startedAt.toISOString(),
                endedAt: endedAt.toISOString(),
                durationMs,
                status: "error",
                error: errorMessage
            })
        }

        console.log(JSON.stringify({
            type: "agent_run",
            agentName: options.agent.name,
            status: "error",
            durationMs,
            error: errorMessage
        }))

        throw error
    }
}

export default runAgent
