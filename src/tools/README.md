# Tools

This directory contains callable functions that agents can use.

Tools let the model ask TypeScript code for help instead of relying only on prompt text.

Current tool:

- `classifyAgentIdea.ts`: classifies a rough agent idea into a category such as `communication`, `research`, or `coding`.

Tool anatomy:

```text
name: what the model calls
description: when the model should use it
parameters: validated input schema
execute: code that actually runs
```
