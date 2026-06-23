# Tracing

This directory contains helpers for recording what happened during agent runs.

Tracing makes agent behavior inspectable after the fact.

Current helper:

- `writeTrace.ts`: writes a JSON trace file to the local `traces/` directory.

`runAgent` only writes detailed trace files when:

```text
NODE_ENV !== "production"
```

This keeps detailed input/output traces available for local learning and debugging while avoiding production disk traces with user content.

Trace records currently include:

- agent name
- input
- output or error
- start and end timestamps
- duration
- success or error status

Production observability uses stdout metadata logs instead of detailed trace files.
