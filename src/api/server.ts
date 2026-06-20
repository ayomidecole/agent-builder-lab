import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import agentBuilderV0 from '../agents/agentBuilderAgent.js';
import criticAgent from '../agents/criticAgent.js';
import runAgent  from '../harness/runAgent.js';


const app = new Hono();

app.use('/agent-spec', cors());
app.use('/_nuxt/*', serveStatic({ root: './web/.output/public' }));
app.get('/_payload.json', serveStatic({ path: './web/.output/public/_payload.json' }));
app.get('/', serveStatic({ path: './web/.output/public/index.html' }));

const generateAgentSpec = async (idea: string) => {
    if (!idea.trim()) {
        throw new Error("idea is required")
    }

    const spec = await runAgent({
        agent: agentBuilderV0,
        input: idea
    })

    const critique = await runAgent({
        agent: criticAgent,
        input: JSON.stringify(spec, null, 2)
    })

    return { spec, critique }
}

app.get('/health', (c) => c.json({
    "ok": true
}))

app.post('/agent-spec', async (c) => {
    try {
        const body = await c.req.json()

        if (!body || typeof body.idea !== "string" || body.idea.trim() === "") {
            return c.json({ error: "idea is required" }, 400)
        }

        const result = await generateAgentSpec(body.idea)
        return c.json(result)
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unexpected error"
        console.error("Failed to generate agent spec:", message)

        return c.json({ error: "failed to generate agent spec" }, 500)
    }
})

const port = Number(process.env.PORT ?? 3000)
serve({
    fetch: app.fetch,
    port
  })
