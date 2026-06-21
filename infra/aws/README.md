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
- `task-definition.json`: ECS/Fargate run recipe for the Docker image.

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

## Task Definition: `agent-builder-lab`

The task definition describes how ECS should run the container image.

It includes:

- the ECR image URI
- Fargate CPU and memory size
- container port `3000`
- the `OPENAI_API_KEY` secret reference
- CloudWatch Logs configuration
- `ARM64` runtime platform for the image built from an Apple Silicon Mac

Create the CloudWatch log group before registering the task:

```bash
aws logs create-log-group \
  --log-group-name /ecs/agent-builder-lab \
  --region us-east-1
```

If the log group already exists, that error is safe to ignore.

Register the task definition:

```bash
aws ecs register-task-definition \
  --cli-input-json file://infra/aws/task-definition.json \
  --region us-east-1
```

Verify:

```bash
aws ecs describe-task-definition \
  --task-definition agent-builder-lab \
  --region us-east-1
```

## AWS Console Checks For Task Definition

Open:

```text
ECS -> Task definitions -> agent-builder-lab
```

Expected details:

```text
Launch type: Fargate
CPU: .25 vCPU
Memory: .5 GB
Runtime platform: Linux/ARM64
Container: agent-builder-lab
Image: 770318456045.dkr.ecr.us-east-1.amazonaws.com/agent-builder-lab:latest
Port mapping: 3000
Secret: OPENAI_API_KEY from SSM Parameter Store
Logs: /ecs/agent-builder-lab
```

Also check:

```text
CloudWatch -> Log groups -> /ecs/agent-builder-lab
```
