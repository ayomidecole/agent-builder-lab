import { tool } from "@openai/agents"
import { z } from "zod"

const classifyAgentIdea = tool({
    name: 'classify_agent_idea',
    description: `
    Given a rough agent idea, classify what kind of agent project it is.
    Classify it into one of these categories:
    - research
    - workflow_automation
    - coding
    - communication
    - data_analysis
    - personal_productivity
    - unknown
    `,
    parameters: z.object({
        idea: z.string()
    }),
    async execute({ idea }) {
        const normalizedIdea = idea.toLowerCase()

        if (
            normalizedIdea.includes("slack") ||
            normalizedIdea.includes("email") ||
            normalizedIdea.includes("message") ||
            normalizedIdea.includes("inbox")
        ) {
            return "Category: communication\nReason: The idea centers on messages, email, Slack, or inbox workflows."
        }

        if (
            normalizedIdea.includes("research") ||
            normalizedIdea.includes("competitor") ||
            normalizedIdea.includes("company") ||
            normalizedIdea.includes("source")
        ) {
            return "Category: research\nReason: The idea centers on gathering, checking, or synthesizing information."
        }

        if (
            normalizedIdea.includes("code") ||
            normalizedIdea.includes("bug") ||
            normalizedIdea.includes("repo") ||
            normalizedIdea.includes("pull request")
        ) {
            return "Category: coding\nReason: The idea centers on software development work."
        }

        if (
            normalizedIdea.includes("dashboard") ||
            normalizedIdea.includes("spreadsheet") ||
            normalizedIdea.includes("metrics") ||
            normalizedIdea.includes("data")
        ) {
            return "Category: data_analysis\nReason: The idea centers on analyzing or reporting data."
        }

        if (
            normalizedIdea.includes("schedule") ||
            normalizedIdea.includes("reminder") ||
            normalizedIdea.includes("daily") ||
            normalizedIdea.includes("todo")
        ) {
            return "Category: personal_productivity\nReason: The idea centers on planning, reminders, or personal workflow support."
        }

        if (
            normalizedIdea.includes("automate") ||
            normalizedIdea.includes("workflow") ||
            normalizedIdea.includes("trigger") ||
            normalizedIdea.includes("approval")
        ) {
            return "Category: workflow_automation\nReason: The idea centers on automating a repeated process."
        }

        return "Category: unknown\nReason: The idea does not clearly match one of the known categories."
    }
})

export default classifyAgentIdea
