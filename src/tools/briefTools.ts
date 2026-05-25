import { tool } from '@openai/agents';
import { z } from 'zod';

const projectTypeGuidance: Record<string, string[]> = {
  support: [
    'Define which tickets are safe for automation and which need escalation.',
    'Track deflection rate, incorrect-answer rate, and time-to-human handoff.',
    'Keep a human review queue for edge cases and policy-sensitive replies.'
  ],
  research: [
    'Separate source gathering from synthesis so claims can be audited.',
    'Require citations or source references for factual claims.',
    'Use eval cases that include ambiguous, stale, or contradictory information.'
  ],
  coding: [
    'Give the agent a constrained workspace, tests, and clear rollback rules.',
    'Ask for a plan before edits when architecture or data migration is involved.',
    'Evaluate with tests, code review, and task-specific acceptance criteria.'
  ],
  operations: [
    'Start with a narrow workflow that has repetitive decisions and visible outcomes.',
    'Log every action the agent takes and require approval for irreversible actions.',
    'Measure cycle time, exception rate, and human correction rate.'
  ],
  general: [
    'Make the goal concrete before adding autonomy.',
    'Expose only the tools needed for the task.',
    'Add review gates where a wrong action would be costly.'
  ]
};

export const getProjectGuidance = tool({
  name: 'get_project_guidance',
  description:
    'Return practical design guidance for an agent project category.',
  parameters: z.object({
    projectType: z
      .enum(['support', 'research', 'coding', 'operations', 'general'])
      .describe('The closest category for the proposed agent project.')
  }),
  execute: async ({ projectType }) => {
    return {
      projectType,
      guidance: projectTypeGuidance[projectType]
    };
  }
});
