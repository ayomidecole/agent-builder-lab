# Agent Lab

This is our learning project for building real agents, not just prompting a chatbot.

The first agent is a **framing agent**. Its job is to turn a vague goal into an executable agent brief: goal, context, tools, steps, handoff points, review gates, and risks. That mirrors the central idea in Dan Shipper's "After Automation": the human creates and judges the frame, while the agent collapses work inside it.

## What You Are Learning

1. **Agent**: instructions, model choice, and behavior.
2. **Tools**: typed functions the model can call.
3. **Harness**: code that runs an agent in a repeatable way.
4. **Evals**: test cases and scoring rules that catch weak outputs.
5. **Deployment**: later, we will put this behind a small web API and UI.

## Run It

```bash
npm install
cp .env.example .env
# Put your OpenAI API key in .env
npm start -- "I want an agent that helps me triage customer feedback and decide what to build next."
```

## Evaluate It

```bash
npm run eval
```

The eval harness is intentionally simple first. We will make it more serious as we learn: better rubrics, saved traces, adversarial cases, and human review notes.

## Learning Path

Phase 1: One agent, one tool, one CLI harness, one eval file.

Phase 2: Add a second specialist agent and make the first agent delegate.

Phase 3: Add persistence, richer tools, and human approval gates.

Phase 4: Add a small web/API surface.

Phase 5: Deploy and monitor traces/evals.
