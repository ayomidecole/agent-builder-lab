# AWS Manual Deployment

This directory contains small AWS configuration files used during the manual ECS/Fargate deployment.

## Current AWS Shape

```text
local Docker image
-> Amazon ECR repository
-> ECS task definition
-> ECS Fargate service
-> load balancer
-> public app URL
```

## Files

- `ecs-tasks-trust-policy.json`: trust policy that allows ECS tasks to assume the task execution role.
- `task-execution-openai-key-policy.json`: inline permissions policy that allows the task execution role to read the OpenAI API key from SSM Parameter Store.

These files do not contain the OpenAI API key value.

## Role: `ecsTaskExecutionRole`

The ECS task execution role is used by AWS infrastructure while starting the container.

It lets ECS/Fargate:

- pull the image from Amazon ECR
- write container logs to CloudWatch Logs
- read the `OPENAI_API_KEY` value from SSM Parameter Store

It is different from a task role. A task role gives permissions to the application code running inside the container. This app does not need a task role yet because the app code does not call AWS APIs.

## Manual Commands

Create the role:

```bash
aws iam create-role \
  --role-name ecsTaskExecutionRole \
  --assume-role-policy-document file://infra/aws/ecs-tasks-trust-policy.json
```

Attach the standard ECS execution policy:

```bash
aws iam attach-role-policy \
  --role-name ecsTaskExecutionRole \
  --policy-arn arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy
```

Attach permission to read the OpenAI key from SSM:

```bash
aws iam put-role-policy \
  --role-name ecsTaskExecutionRole \
  --policy-name AgentBuilderLabReadOpenAIKey \
  --policy-document file://infra/aws/task-execution-openai-key-policy.json
```

Verify:

```bash
aws iam get-role \
  --role-name ecsTaskExecutionRole
```

## AWS Console Checks

Open:

```text
IAM -> Roles -> ecsTaskExecutionRole
```

Expected trust relationship:

```text
ecs-tasks.amazonaws.com
```

Expected permissions:

```text
AmazonECSTaskExecutionRolePolicy
AgentBuilderLabReadOpenAIKey
```

Also check:

```text
Systems Manager -> Parameter Store -> /agent-builder-lab/openai-api-key
```

The parameter should be type `SecureString`.
