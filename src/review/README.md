# Review

This directory contains human review helpers.

Human review gates are deliberate pauses where the system asks a person to approve, reject, or eventually edit an agent result.

Current helper:

- `askForApproval.ts`: asks for `y/n` approval in the terminal and returns a boolean.

This keeps human control outside the model:

```text
agent proposes
human decides
```
