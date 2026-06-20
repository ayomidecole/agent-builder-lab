# API

This directory contains the HTTP API for Agent Builder Lab.

The API exposes the agent-builder workflow to clients outside the CLI.

Current server:

- `server.ts`: Hono server with health and agent-spec routes.

Current routes:

```text
GET /
```

Serves the generated Nuxt UI frontend from `web/.output/public/index.html`.

```text
GET /_nuxt/*
```

Serves generated Nuxt frontend assets from `web/.output/public`.

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
  "critique": {
    "biggestConcern": "...",
    "missingRisks": [],
    "workflowGaps": [],
    "toolingGaps": [],
    "evalImprovements": [],
    "recommendedNextRevision": []
  }
}
```

The route validates that `idea` is a non-empty string, runs Agent Builder Agent v0, then runs Critic Agent against the generated spec.

The API does not perform human approval yet. Human approval currently exists in the CLI workflow.

`POST /agent-spec` has CORS enabled so the Nuxt dev server on port `3001` can call the API on port `3000`. In production, the frontend and API are same-origin.

Development command:

```bash
npm run api
```

Production command after build:

```bash
npm run build
npm start
```

Docker runs the production command inside the container.
