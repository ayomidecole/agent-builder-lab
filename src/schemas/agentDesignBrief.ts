import { z } from "zod"

const ToolSpecSchema = z.object({
  name: z.string(),
  purpose: z.string(),
  input: z.string(),
  output: z.string()
})

const DataModelSpecSchema = z.object({
  name: z.string(),
  fields: z.array(z.string()),
  purpose: z.string()
})

const StructuredOutputFieldSchema = z.object({
  name: z.string(),
  type: z.string(),
  description: z.string()
})

const HumanReviewGateSchema = z.object({
  name: z.string(),
  when: z.string(),
  decision: z.string()
})

const EvalSpecSchema = z.object({
  name: z.string(),
  input: z.string(),
  expectedBehavior: z.string()
})

const ImplementationStepSchema = z.object({
  step: z.string(),
  outcome: z.string()
})

export const AgentDesignBriefSchema = z.object({
  category: z.string(),
  agentName: z.string(),
  purpose: z.string(),
  targetUser: z.string(),
  problemStatement: z.string(),
  workflow: z.array(z.string()),
  tools: z.array(ToolSpecSchema),
  dataModel: z.array(DataModelSpecSchema),
  structuredOutput: z.array(StructuredOutputFieldSchema),
  humanReviewGates: z.array(HumanReviewGateSchema),
  evals: z.array(EvalSpecSchema),
  risks: z.array(z.string()),
  implementationPlan: z.array(ImplementationStepSchema),
  deploymentNotes: z.array(z.string())
})

export type AgentDesignBrief = z.infer<typeof AgentDesignBriefSchema>
