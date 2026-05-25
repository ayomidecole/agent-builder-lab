import { Agent } from "@openai/agents"

// Step 4 goal:
// Move the reusable "run this agent with this input" logic out of one-off scripts.
//
// This function should eventually:
// 1. Accept an Agent
// 2. Accept a user input string
// 3. Run the agent
// 4. Return the final output

// TODO: Define a type for the options this harness function needs.
// Hint: it should include an Agent and the user's input string.
// Example name to consider: RunAgentOptions

// TODO: Add the right parameter and parameter type to this function.
export async function runAgent() {
    // TODO: Import and call `run` from "@openai/agents".
    // TODO: Pass the agent and input into the SDK run function.
    // TODO: Return the final output from the result.
    throw new Error("runAgent is not implemented yet")
}
