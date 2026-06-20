# Web Frontend

This directory contains the thin Nuxt UI frontend for Agent Builder Lab.

The frontend is intentionally thin and mainly exists to test the agent-builder workflow through a browser:

- render the agent idea form
- call the existing Hono API at `POST /agent-spec`
- display the structured spec and structured critique

The agent system still lives in `src/`. Nuxt is the browser interface, not the agent runtime.

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

Use this workflow while changing UI. It hot-reloads frontend edits and avoids rebuilding Docker after every small visual tweak.

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

## Docker Check

When you want to verify the same path used for deployment, run:

```bash
npm run docker:refresh
```

This rebuilds the Docker image and starts the app at:

```text
http://localhost:3000
```
