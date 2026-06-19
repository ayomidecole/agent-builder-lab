# API

This directory contains the HTTP API for Agent Builder Lab.

The API exposes the agent-builder workflow to clients outside the CLI.

Current server:

- `server.ts`: Hono server with health and agent-spec routes.

Current routes:

```text
GET /health
```

Returns:

```json
{ "ok": true }
```

```text
POST /agent-spec
```

Accepts:

```json
{ "idea": "I want an agent that researches companies before sales calls." }
```

Returns:

```json
{
  "spec": {},
  "critique": "..."
}
```

The route validates that `idea` is a non-empty string, runs Agent Builder Agent v0, then runs Critic Agent against the generated spec.

The API does not perform human approval yet. Human approval currently exists in the CLI workflow.
