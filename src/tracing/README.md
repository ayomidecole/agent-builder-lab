# Tracing

This directory contains helpers for recording what happened during agent runs.

Tracing makes agent behavior inspectable after the fact.

Current helper:

- `writeTrace.ts`: writes a JSON trace file to the local `traces/` directory.

Trace records currently include:

- agent name
- input
- output or error
- start and end timestamps
- duration
- success or error status
