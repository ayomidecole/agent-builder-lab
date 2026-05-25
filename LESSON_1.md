# Lesson 1: The Frame Is The Work

The article argues that automation makes the human role more important, not less.
Agents can collapse work inside a frame, but a human still has to choose the
frame, judge the result, and decide what should happen next.

In this repo, we start with that idea directly.

## Vocabulary

**Agent**: a model configured with instructions, tools, and a job.

**Tool**: a typed function the agent can call to get information or take action.

**Harness**: the code around the agent that runs it repeatably, passes inputs,
captures outputs, and handles errors.

**Eval**: a test that tells us whether the agent is doing useful work.

**Human review gate**: a point where the agent must stop and let a person approve,
correct, or redirect the work.

## What We Built First

We built a framing agent named `Framewright`.

It takes a vague agent idea and turns it into a brief:

1. Goal
2. Why an agent is appropriate
3. Proposed workflow
4. Tools the agent needs
5. Human review gates
6. Evals and success metrics
7. First build slice
8. Questions for the human

This is deliberately meta. Before we build powerful agents, we build an agent
that helps us design them well.

## Your Job

You are the framer.

When we run the agent, your job is to ask:

1. Did it understand what actually matters?
2. Did it propose tools that match the real workflow?
3. Did it put human review gates in the right places?
4. Would you trust this plan enough to build from it?

## My Job

I will handle the scaffolding, API details, harnesses, evals, deployment setup,
and code changes. I will also explain what I am doing as we go, but I will not
make you memorize all of it at once.

## The Next Upgrade

Next we will make this into a tiny multi-agent system:

- `Framewright`: turns fuzzy goals into a buildable brief.
- `Skeptic`: attacks the brief and looks for missing risks.
- `Builder`: turns an approved brief into implementation tasks.

That will teach handoffs, agent-as-tool patterns, and why review loops matter.
