import { createInterface } from "node:readline/promises"
import { stdin as input, stdout as output } from "node:process"

export async function askForApproval(): Promise<boolean> {
    const rl = createInterface({
        input,
        output
    })
    const answer = await rl.question("Approve this brief? (y/n): ")
    rl.close()
    const normalizedAnswer = answer.trim().toLowerCase()

    if (normalizedAnswer === 'y' || normalizedAnswer === 'yes') {
        return true
    } else {
        return false
    }
  }