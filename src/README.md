# Source Directory

This directory contains the working code for Agent Builder Lab.

The project is organized around a simple agent workflow:

```text
user idea
-> Agent Builder Agent creates a structured agent spec
-> Critic Agent reviews the spec
-> traces and evals help us inspect behavior
```

There are currently two ways to run the workflow:

```text
CLI: user idea -> spec -> critique -> human approval
API/frontend: user idea -> POST /agent-spec -> spec + critique JSON response
```

Important entry points:

- `smoke.ts`: tiny SDK wiring check.
- `runAgentBuilder.ts`: CLI workflow for running the builder, critic, and approval gate.
- `api/server.ts`: Hono HTTP API exposing the builder + critic workflow.
- `../web/`: Nuxt UI frontend generated during `npm run build` and served by the API.

Subdirectories:

- `agents/`: agent definitions and instructions.
- `api/`: HTTP server and API routes.
- `tools/`: callable TypeScript functions agents can use.
- `schemas/`: Zod schemas and inferred TypeScript types.
- `harness/`: reusable execution wrapper for running agents.
- `evals/`: executable eval scripts.
- `tracing/`: local trace-writing helpers.
- `review/`: human approval helpers.
