import { mkdir, writeFile } from "node:fs/promises"
import { join } from "node:path"

export type TraceRecord = {
    agentName: string
    input: string
    startedAt: string
    endedAt: string
    durationMs: number
    status: "success" | "error"
    output?: unknown
    error?: string
}

export async function writeTrace(trace: TraceRecord): Promise<void> {
    const tracesDir = "traces"

    await mkdir(tracesDir, { recursive: true })

    const safeStartedAt = trace.startedAt.replace(/[:.]/g, "-")
    const safeAgentName = trace.agentName.toLowerCase().replace(/\s+/g, "-")
    const fileName = `${safeStartedAt}-${safeAgentName}.json`
    const filePath = join(tracesDir, fileName)

    await writeFile(filePath, JSON.stringify(trace, null, 2))
}
