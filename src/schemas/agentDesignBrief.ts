import { z } from "zod"

export const AgentDesignBriefSchema = z.object({
  category: z.string(),
  agentName: z.string(),
  purpose: z.string(),
  targetUser: z.string(),
  workflow: z.array(z.string()),
  toolsItMightNeed: z.array(z.string()),
  risks: z.array(z.string()),
  evalIdeas: z.array(z.string()),
  firstImplementationStep: z.string()
})

export type AgentDesignBrief = z.infer<typeof AgentDesignBriefSchema>