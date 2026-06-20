# Agent Builder Lab

Agent Builder Lab is an engineering-first project for learning how to build AI agents step by step.

The goal is not to generate a demo as fast as possible. The goal is to understand the moving parts well enough to design, build, evaluate, and deploy agent systems with confidence.

## Mission

Build a practical TypeScript repo that teaches agent engineering from the ground up, using a real agents SDK while making each abstraction explicit.

By the end, this repo will contain an **agent-builder agent**: a system that helps users design, evaluate, and scaffold their own agents.

## Who This Is For

This project is for software engineers who already understand normal application development and want to become fluent in agentic systems.

It should be useful whether someone is building with Codex, Claude Code, OpenAI Agents SDK, or another coding assistant.

## What We Are Building

We are building two things at once:

1. A learning lab that explains the core layers of agent engineering.
2. A final agent-builder application that can help create new agent specs, tools, evals, and starter scaffolds.

The final system should help a user move from:

```text
I want an agent that does X.
```

to:

```text
agent spec
tool plan
structured output contract
eval cases
risk review
starter implementation plan
deployment checklist
```

## Learning Path

0. Project Definition
1. `package.json`
2. SDK Smoke Test
3. First Agent
4. Harness
5. Tools
6. Structured Output
7. Evals
8. Tracing
9. Human Review Gates
10. Multi-Agent / Handoffs
11. Agent Builder
12. API
13. Deployment
14. Production Observability

## Current State

The project currently includes:

- a structured Agent Builder Agent that turns rough ideas into buildable agent specs
- a Critic Agent that returns structured reviews of those specs
- a reusable agent harness with local JSON tracing
- eval cases and an eval runner
- a CLI flow with a human approval gate
- a Hono HTTP API with `GET /health` and `POST /agent-spec`
- a Nuxt UI frontend served by the API at `/`
- a Dockerfile for running the API and frontend in one container

## Common Commands

```bash
npm run smoke
npm run agent-builder
npm run eval
npm run api
npm run web:dev
npm run build
npm start
```

Local frontend development uses two terminals:

```bash
npm run api
npm run web:dev
```

The Nuxt UI frontend runs at `http://localhost:3001` and calls the API at `http://localhost:3000`.

Production mode serves the generated Nuxt UI frontend from the Hono API server:

```bash
npm run build
npm start
```

Docker:

```bash
docker build -t agent-builder-lab .
docker run --rm -p 3000:3000 -e OPENAI_API_KEY="$OPENAI_API_KEY" agent-builder-lab
```

After starting the API, open:

```text
http://localhost:3000/
```

## Working Agreement

The learner writes the important code by hand.

The guide explains concepts, assigns focused tasks, points to documentation, reviews code, debugs issues, and keeps the project moving one step at a time.

We prefer small, understandable steps over large generated jumps.
