type AgentBuilderEvalCase = {
    id: string
    input: string
    expectedCategory: string
}

const agentBuilderCases: AgentBuilderEvalCase[] = [
    {
        id: "slack-email-brief",
        input: "I want an agent that sends me a Slack summary of my emails every morning.",
        expectedCategory: "communication"
    },
    {
        id: "company-research-sales",
        input: "I want an agent that researches companies before sales calls and gives me a short prep brief.",
        expectedCategory: "research"
    },
    {
        id: "repo-bug-fixer",
        input: "I want an agent that looks through my repo and helps fix small bugs.",
        expectedCategory: "coding"
    },
    {
        id: "metrics-dashboard",
        input: "I want an agent that reviews dashboard metrics every week and explains what changed.",
        expectedCategory: "data_analysis"
    },
    {
        id: "daily-reminder-planner",
        input: "I want an agent that sends me daily reminders and helps plan my todo list.",
        expectedCategory: "personal_productivity"
    }
]

export default agentBuilderCases

