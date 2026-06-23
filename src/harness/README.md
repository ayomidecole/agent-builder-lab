# Harness

This directory contains reusable execution code around agents.

The harness is the layer that runs agents consistently. It is separate from the agents themselves.

Current harness:

- `runAgent.ts`: runs an agent with input, returns the final output, writes local traces outside production, and emits production-safe stdout telemetry.

Agent telemetry uses metadata only:

```json
{
  "type": "agent_run",
  "agentName": "Agent Builder v0",
  "status": "success",
  "durationMs": 12879
}
```

On error, it adds a short `error` field.

The harness intentionally does not log full inputs or outputs to stdout. Production logs should help operate the system without storing user content.

The harness is a natural place for cross-cutting behavior such as:

- tracing
- error handling
- timing
- logging or run metadata
