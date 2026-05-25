import 'dotenv/config';
import { run } from '@openai/agents';
import { framingAgent } from './agents/framingAgent.js';

const input = process.argv.slice(2).join(' ').trim();

if (!input) {
  console.error('Usage: npm start -- "Describe the agent you want to build"');
  process.exit(1);
}

if (!process.env.OPENAI_API_KEY) {
  console.error('Missing OPENAI_API_KEY. Copy .env.example to .env and add your key.');
  process.exit(1);
}

const result = await run(framingAgent, input);
console.log(result.finalOutput);
