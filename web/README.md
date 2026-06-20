# Web Frontend

This directory contains the Nuxt UI frontend for Agent Builder Lab.

The frontend is intentionally thin:

- render the agent idea form
- call the existing Hono API at `POST /agent-spec`
- display the structured spec and structured critique

The agent system still lives in `src/`. Nuxt is the product interface, not the agent runtime.

## Local Development

Run the API:

```bash
npm run api
```

Run the Nuxt dev server in another terminal:

```bash
npm run web:dev
```

The Nuxt dev server runs on:

```text
http://localhost:3001
```

In dev, the frontend calls the API at `http://localhost:3000`.

## Production Build

The root build command compiles both layers:

```bash
npm run build
```

That runs:

1. `tsc` for the Hono API and agent code
2. `nuxt generate web` for the static Nuxt UI frontend

The generated frontend lands in:

```text
web/.output/public
```

The production Hono server serves that directory at `/`.
