# Agents

This directory contains agent definitions.

An agent is a configured model behavior:

```text
agent = name + instructions + tools + optional output schema
```

Current agents:

- `agentBuilderAgent.ts`: turns a rough agent idea into a buildable structured spec.
- `criticAgent.ts`: reviews the generated spec for gaps, risks, and weak evals.

Keep agent files focused on role, instructions, tools, and output type. Workflow orchestration belongs outside this directory.
