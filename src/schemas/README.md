# Schemas

This directory contains runtime schemas and TypeScript types.

The project uses Zod schemas to make agent output structured and validated.

Current schemas:

- `agentDesignBrief.ts`: defines the buildable agent spec returned by Agent Builder Agent v0.
- `criticReview.ts`: defines the structured review returned by Critic Agent.

Important distinction:

```text
Zod schema = runtime validation
TypeScript type = compile-time developer help
```
