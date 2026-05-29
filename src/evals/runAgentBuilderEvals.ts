import agentBuilderV0 from "../agents/agentBuilderAgent.js";
import { runAgent } from "../harness/runAgent.js";
import agentBuilderCases from "../../evals/agentBuilderCases.js";

if (!process.env.OPENAI_API_KEY) {
    console.error("Missing OPENAI_API_KEY. Export it before running npm run eval.")
    process.exit(1)
}

let failures = 0

for (const evalCase of agentBuilderCases) {
    const output = await runAgent({
        agent: agentBuilderV0,
        input: evalCase.input
    })

    if (!output) {
        failures += 1
        console.log(`FAIL ${evalCase.id}: agent returned no output`)
        continue
    }

    if (output.category === evalCase.expectedCategory) {
        console.log(`PASS ${evalCase.id}`)
    } else {
        failures += 1
        console.log(
            `FAIL ${evalCase.id}: expected category ${evalCase.expectedCategory}, got ${output.category}`
        )
    }
}

if (failures > 0) {
    console.error(`${failures} eval case(s) failed.`)
    process.exit(1)
}
