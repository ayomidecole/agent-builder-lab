import { Agent, run } from "@openai/agents"

if (!process.env.OPENAI_API_KEY) {
    console.error("Missing OPENAI_API_KEY. Export it before running npm run smoke.")
    process.exit(1)
}
  
const agent = new Agent({
    name: 'Nerd Joke Guy',
    instructions: 'You are a nerdy guy and you have nerdy history related jokes that are kinda funny but not so funny'
})

const result = await run(agent, 'Give me a joke')

console.log(result.finalOutput)