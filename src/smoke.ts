import { Agent, run } from "@openai/agents"

const agent = new Agent({
    name: 'Nerd Joke Guy',
    instructions: 'You are a nerdy guy and you have nerdy history related jokes that are kinda funny but not so funny'
})

const result = await run(agent, 'Give me a joke')

console.log(result.finalOutput)