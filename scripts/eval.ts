import 'dotenv/config';
import { readFile } from 'node:fs/promises';
import { run } from '@openai/agents';
import { framingAgent } from '../src/agents/framingAgent.js';

type EvalCase = {
  id: string;
  input: string;
  mustInclude: string[];
};

const requiredSections = [
  'Goal',
  'Why an agent is appropriate',
  'Proposed workflow',
  'Tools the agent needs',
  'Human review gates',
  'Evals and success metrics',
  'First build slice',
  'Questions for the human'
];

function scoreOutput(output: string, testCase: EvalCase) {
  const lower = output.toLowerCase();
  const sectionHits = requiredSections.filter((section) =>
    lower.includes(section.toLowerCase())
  );
  const keywordHits = testCase.mustInclude.filter((term) =>
    lower.includes(term.toLowerCase())
  );
  const asksTooManyQuestions = (output.match(/\?/g) ?? []).length > 3;

  const score =
    sectionHits.length / requiredSections.length * 0.7 +
    keywordHits.length / testCase.mustInclude.length * 0.3 -
    (asksTooManyQuestions ? 0.2 : 0);

  return {
    score: Math.max(0, Math.min(1, score)),
    sectionHits,
    keywordHits,
    asksTooManyQuestions
  };
}

if (!process.env.OPENAI_API_KEY) {
  console.error('Missing OPENAI_API_KEY. Copy .env.example to .env and add your key.');
  process.exit(1);
}

const cases = JSON.parse(
  await readFile(new URL('./cases.json', import.meta.url), 'utf8')
) as EvalCase[];

let failures = 0;

for (const testCase of cases) {
  const result = await run(framingAgent, testCase.input);
  const output = result.finalOutput ?? '';
  const scored = scoreOutput(output, testCase);
  const passed = scored.score >= 0.82 && !scored.asksTooManyQuestions;

  if (!passed) failures += 1;

  console.log(`\n${passed ? 'PASS' : 'FAIL'} ${testCase.id} ${scored.score.toFixed(2)}`);
  console.log(`Sections: ${scored.sectionHits.length}/${requiredSections.length}`);
  console.log(`Keywords: ${scored.keywordHits.join(', ') || 'none'}`);
}

if (failures > 0) {
  process.exit(1);
}
