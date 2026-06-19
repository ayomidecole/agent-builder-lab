# Evals

This directory contains executable eval runners.

Evals are repeatable checks for agent behavior. They help us avoid judging outputs only by vibes.

Current eval runner:

- `runAgentBuilderEvals.ts`: runs Agent Builder Agent v0 against cases in `evals/agentBuilderCases.ts`.

The current evals check:

- expected category
- required output fields are non-empty
- process exits with failure when checks fail
