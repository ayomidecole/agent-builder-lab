# GitHub Actions Workflows

This directory contains CI/CD workflow definitions.

Current workflow:

- `ci.yml`: runs the project CI checks on pushes to `main` and on pull requests.

The CI workflow currently checks:

```text
npm ci
npm run build
docker build
```

This proves that dependencies install cleanly, the TypeScript/Nuxt production build works, and the Docker image can be built.

Live agent evals are not run in CI yet because they require `OPENAI_API_KEY`, call the OpenAI API, and can create cost/flakiness. They can be added later as a separate manual or protected workflow.
