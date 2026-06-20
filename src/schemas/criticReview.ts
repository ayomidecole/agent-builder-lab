import { z } from "zod"

export const CriticReviewSchema = z.object({
  biggestConcern: z.string(),
  missingRisks: z.array(z.string()),
  workflowGaps: z.array(z.string()),
  toolingGaps: z.array(z.string()),
  evalImprovements: z.array(z.string()),
  recommendedNextRevision: z.array(z.string())
})

export type CriticReview = z.infer<typeof CriticReviewSchema>
