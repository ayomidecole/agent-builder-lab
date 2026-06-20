# Eval Cases

This directory contains eval fixtures: the inputs and expected outcomes used by executable eval runners.

Current file:

- `agentBuilderCases.ts`: cases for Agent Builder Agent v0, including expected classification categories.

The executable runner lives in `src/evals/`.

Current flow:

```text
eval case
-> Agent Builder Agent v0
-> structured spec
-> deterministic checks
```

Keep this directory focused on eval data. Put runner logic in `src/evals/`.
