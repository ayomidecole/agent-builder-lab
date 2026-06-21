<script setup lang="ts">
import { CircleAlert, Copy, Download } from '@lucide/vue';

type ToolSpec = {
  name: string;
  purpose: string;
  input: string;
  output: string;
};

type HumanReviewGate = {
  name: string;
  when: string;
  decision: string;
};

type ImplementationStep = {
  step: string;
  outcome: string;
};

type AgentSpec = {
  category: string;
  agentName: string;
  purpose: string;
  targetUser: string;
  problemStatement: string;
  workflow: string[];
  tools: ToolSpec[];
  humanReviewGates: HumanReviewGate[];
  implementationPlan: ImplementationStep[];
};

type Critique = {
  biggestConcern: string;
  missingRisks: string[];
  workflowGaps: string[];
  toolingGaps: string[];
  evalImprovements: string[];
  recommendedNextRevision: string[];
};

type AgentSpecResponse = {
  spec: AgentSpec;
  critique: Critique;
};

const config = useRuntimeConfig();

const idea = ref('I want an agent that researches companies before sales calls.');
const result = ref<AgentSpecResponse | null>(null);
const error = ref('');
const isLoading = ref(false);

const statusLabel = computed(() => {
  if (isLoading.value) return 'Generating';
  if (result.value) return 'Ready';
  return 'Waiting';
});

const exampleIdeas = [
  'Research companies before sales calls.',
  'Summarize customer support tickets into product insights.',
  'Draft a daily Slack brief from important emails.'
];

const submitIdea = async () => {
  error.value = '';

  if (!idea.value.trim()) {
    error.value = 'Write a rough agent idea first.';
    return;
  }

  isLoading.value = true;

  try {
    result.value = await $fetch<AgentSpecResponse>('/agent-spec', {
      baseURL: config.public.apiBase,
      method: 'POST',
      body: { idea: idea.value }
    });
  } catch {
    error.value = 'The spec failed to generate. Check that the API is running and OPENAI_API_KEY is set.';
  } finally {
    isLoading.value = false;
  }
};

const copyJson = async () => {
  if (!result.value) return;
  await navigator.clipboard.writeText(JSON.stringify(result.value, null, 2));
};

const exportJson = () => {
  if (!result.value) return;

  const file = new Blob([JSON.stringify(result.value, null, 2)], {
    type: 'application/json'
  });
  const url = URL.createObjectURL(file);
  const link = document.createElement('a');

  link.href = url;
  link.download = 'agent-spec.json';
  link.click();
  URL.revokeObjectURL(url);
};
</script>

<template>
  <main class="min-h-screen bg-white text-slate-900">
    <header class="flex h-16 items-center justify-between border-b border-slate-100 px-5 md:px-10">
      <div class="flex h-full items-center">
        <div class="font-mono text-sm text-slate-900">
          <span class="text-slate-400">~/</span>agent-builder-lab
        </div>
      </div>

      <div class="flex items-center gap-2">
        <UBadge color="neutral" variant="soft" class="rounded-full">
          {{ statusLabel }}
        </UBadge>
        <UButton
          v-if="result"
          type="button"
          color="neutral"
          variant="ghost"
          size="sm"
          aria-label="Copy JSON"
          @click="copyJson"
        >
          <Copy class="size-4" />
        </UButton>
        <UButton
          v-if="result"
          type="button"
          color="neutral"
          variant="solid"
          size="sm"
          @click="exportJson"
        >
          <Download class="size-4" />
          Export
        </UButton>
      </div>
    </header>

    <section class="mx-auto max-w-3xl px-5 pb-24 pt-20 md:px-8">
      <form class="space-y-5" @submit.prevent="submitIdea">
        <div class="space-y-3">
          <h1 class="text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
            Build an agent <span class="text-emerald-700">spec</span>
          </h1>
          <p class="max-w-2xl text-lg leading-8 text-slate-600">
            Write the idea, run the builder, inspect the structured output.
          </p>
        </div>

        <div class="shell-panel">
          <div class="command-line">
            <span class="text-slate-400">$</span>
            <span>agent-builder build --from-idea</span>
            <span class="command-cursor" aria-hidden="true"></span>
            <span class="ml-auto text-emerald-700">v0</span>
          </div>

          <UFormField label="stdin">
            <UTextarea
              v-model="idea"
              autoresize
              :rows="7"
              size="xl"
              placeholder="I want an agent that..."
              class="w-full"
              :ui="{ base: 'font-mono leading-7' }"
            />
          </UFormField>
        </div>

        <div class="flex flex-wrap gap-2">
          <span class="font-mono text-sm leading-8 text-slate-400">try:</span>
          <UButton
            v-for="example in exampleIdeas"
            :key="example"
            type="button"
            color="neutral"
            variant="soft"
            size="sm"
            class="idea-chip"
            @click="idea = example"
          >
            {{ example }}
          </UButton>
        </div>

        <UAlert
          v-if="error"
          color="error"
          variant="soft"
          :description="error"
        >
          <template #icon>
            <CircleAlert class="size-5" />
          </template>
        </UAlert>

        <div class="flex justify-end">
          <UButton
            type="submit"
            color="neutral"
            size="lg"
            class="bg-slate-950 text-white hover:bg-slate-800"
            :disabled="isLoading"
          >
            {{ isLoading ? 'running' : 'run builder' }}
          </UButton>
        </div>
      </form>

      <section class="mt-20">
        <div v-if="isLoading" class="space-y-4">
          <USkeleton class="h-8 w-2/3" />
          <USkeleton class="h-4 w-full" />
          <USkeleton class="h-4 w-5/6" />
          <USkeleton class="h-28 w-full" />
        </div>

        <div v-else-if="!result" class="border-t border-slate-100 pt-10 text-slate-400">
          <p class="font-mono text-sm">stdout is empty. run builder to generate a spec.</p>
        </div>

        <article v-else class="spec-document">
          <div class="mb-10">
            <p class="mb-3 font-mono text-sm text-slate-400">
              stdout / {{ result.spec.category }}
            </p>
            <h2>{{ result.spec.agentName }}</h2>
            <p class="lead">{{ result.spec.purpose }}</p>
          </div>

          <section>
            <h3>Target user</h3>
            <p>{{ result.spec.targetUser }}</p>
          </section>

          <section>
            <h3>Problem</h3>
            <p>{{ result.spec.problemStatement }}</p>
          </section>

          <section>
            <h3>Workflow</h3>
            <ol>
              <li v-for="step in result.spec.workflow" :key="step">
                {{ step }}
              </li>
            </ol>
          </section>

          <section>
            <h3>Tools</h3>
            <div class="space-y-4">
              <div v-for="tool in result.spec.tools" :key="tool.name">
                <p class="font-semibold text-slate-950">{{ tool.name }}</p>
                <p>{{ tool.purpose }}</p>
              </div>
            </div>
          </section>

          <section>
            <h3>Human review gates</h3>
            <div class="space-y-4">
              <div v-for="gate in result.spec.humanReviewGates" :key="gate.name">
                <p class="font-semibold text-slate-950">{{ gate.name }}</p>
                <p>{{ gate.when }}</p>
                <p class="text-sm text-slate-500">{{ gate.decision }}</p>
              </div>
            </div>
          </section>

          <section>
            <h3>Implementation plan</h3>
            <ol>
              <li v-for="item in result.spec.implementationPlan" :key="item.step">
                <span class="font-semibold text-slate-950">{{ item.step }}:</span>
                {{ item.outcome }}
              </li>
            </ol>
          </section>

          <section class="critique">
            <h3>Critic review</h3>
            <p>{{ result.critique.biggestConcern }}</p>

            <h4>Missing risks</h4>
            <ul>
              <li v-for="risk in result.critique.missingRisks" :key="risk">
                {{ risk }}
              </li>
            </ul>

            <h4>Recommended revision</h4>
            <ul>
              <li v-for="revision in result.critique.recommendedNextRevision" :key="revision">
                {{ revision }}
              </li>
            </ul>
          </section>
        </article>
      </section>
    </section>
  </main>
</template>
