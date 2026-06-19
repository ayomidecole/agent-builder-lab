# Source Directory

This directory contains the working code for Agent Builder Lab.

The project is organized around a simple agent workflow:

```text
user idea
-> Agent Builder Agent creates a structured agent spec
-> Critic Agent reviews the spec
-> human approves or rejects the result
-> traces and evals help us inspect behavior
```

Important entry points:

- `smoke.ts`: tiny SDK wiring check.
- `runAgentBuilder.ts`: CLI workflow for running the builder, critic, and approval gate.

Subdirectories:

- `agents/`: agent definitions and instructions.
- `tools/`: callable TypeScript functions agents can use.
- `schemas/`: Zod schemas and inferred TypeScript types.
- `harness/`: reusable execution wrapper for running agents.
- `evals/`: executable eval scripts.
- `tracing/`: local trace-writing helpers.
- `review/`: human approval helpers.
