# Harness

This directory contains reusable execution code around agents.

The harness is the layer that runs agents consistently. It is separate from the agents themselves.

Current harness:

- `runAgent.ts`: runs an agent with input, returns the final output, and writes a local trace.

The harness is a natural place for cross-cutting behavior such as:

- tracing
- error handling
- timing
- future logging or run metadata
