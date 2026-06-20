<script setup lang="ts">
import {
  Bot,
  CircleAlert,
  Dot,
  FileText,
  ListChecks,
  Route,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Wrench
} from '@lucide/vue';

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
    error.value = 'The agent spec failed to generate. Check that the API is running and OPENAI_API_KEY is set.';
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <main class="min-h-screen text-slate-950">
    <section class="mx-auto grid min-h-screen w-full max-w-7xl gap-8 px-5 py-6 md:grid-cols-[0.92fr_1.08fr] md:px-8 lg:px-10">
      <aside class="flex flex-col justify-between rounded-[2rem] border border-white/80 bg-white/80 p-6 shadow-2xl shadow-slate-200/70 ring-1 ring-slate-950/5 backdrop-blur md:sticky md:top-6 md:h-[calc(100vh-3rem)]">
        <div class="space-y-8">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="grid size-10 place-items-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-300">
                <Bot class="size-5" />
              </div>
              <div>
                <p class="text-sm font-semibold text-slate-950">Agent Builder Lab</p>
                <p class="text-xs text-slate-500">Spec generator</p>
              </div>
            </div>
            <UBadge color="neutral" variant="subtle" class="rounded-full">v0</UBadge>
          </div>

          <div class="space-y-5">
            <div class="space-y-3">
              <h1 class="max-w-xl text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
                Turn a rough agent idea into an engineering spec.
              </h1>
              <p class="max-w-lg text-base leading-7 text-slate-600">
                The builder drafts the architecture. The critic pressure-tests it. You inspect the result before shipping anything real.
              </p>
            </div>

            <UCard class="border-slate-200/80 bg-white/90 shadow-sm" :ui="{ body: 'p-4 sm:p-5' }">
              <form class="space-y-4" @submit.prevent="submitIdea">
                <UFormField label="Agent idea" help="Plain English is enough. The output will be structured for engineering review.">
                  <UTextarea
                    v-model="idea"
                    autoresize
                    :rows="6"
                    size="xl"
                    placeholder="I want an agent that..."
                    class="w-full"
                  />
                </UFormField>

                <div class="flex flex-wrap gap-2">
                  <UButton
                    v-for="example in exampleIdeas"
                    :key="example"
                    type="button"
                    color="neutral"
                    variant="soft"
                    size="sm"
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

                <UButton
                  type="submit"
                  size="xl"
                  color="primary"
                  :loading="isLoading"
                  block
                >
                  <Sparkles class="size-4" />
                  Generate spec
                </UButton>
              </form>
            </UCard>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-3 pt-8">
          <div class="rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <p class="text-xs text-slate-500">Flow</p>
            <p class="mt-1 text-sm font-semibold text-slate-900">Builder</p>
          </div>
          <div class="rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <p class="text-xs text-slate-500">Review</p>
            <p class="mt-1 text-sm font-semibold text-slate-900">Critic</p>
          </div>
          <div class="rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <p class="text-xs text-slate-500">Output</p>
            <p class="mt-1 text-sm font-semibold text-slate-900">JSON</p>
          </div>
        </div>
      </aside>

      <section class="space-y-5 py-1">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-slate-500">Generated output</p>
            <h2 class="text-2xl font-semibold tracking-tight text-slate-950">Spec and critique</h2>
          </div>
          <UBadge
            :color="result ? 'success' : 'neutral'"
            variant="soft"
            class="rounded-full"
          >
            {{ result ? 'Ready' : 'Waiting' }}
          </UBadge>
        </div>

        <div v-if="isLoading" class="grid gap-4">
          <UCard v-for="item in 4" :key="item" :ui="{ body: 'space-y-4' }">
            <USkeleton class="h-5 w-1/3" />
            <USkeleton class="h-4 w-full" />
            <USkeleton class="h-4 w-4/5" />
          </UCard>
        </div>

        <UCard v-else-if="!result" class="border-dashed border-slate-300 bg-white/70" :ui="{ body: 'p-10' }">
            <div class="mx-auto max-w-md text-center">
            <div class="mx-auto grid size-12 place-items-center rounded-2xl bg-slate-100 text-slate-500">
              <FileText class="size-6" />
            </div>
            <h3 class="mt-4 text-lg font-semibold text-slate-950">No spec yet</h3>
            <p class="mt-2 text-sm leading-6 text-slate-600">
              Submit an idea and the lab will return a structured agent design brief plus a critic review.
            </p>
          </div>
        </UCard>

        <div v-else class="space-y-5">
          <UCard class="bg-white/90" :ui="{ body: 'p-5 sm:p-6' }">
            <div class="flex flex-wrap items-start justify-between gap-4">
              <div>
                <UBadge color="primary" variant="soft" class="mb-3 rounded-full">
                  {{ result.spec.category }}
                </UBadge>
                <h3 class="text-2xl font-semibold tracking-tight text-slate-950">
                  {{ result.spec.agentName }}
                </h3>
              </div>
            </div>
            <USeparator class="my-5" />
            <div class="grid gap-4 md:grid-cols-2">
              <div>
                <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">Purpose</p>
                <p class="mt-2 text-sm leading-6 text-slate-700">{{ result.spec.purpose }}</p>
              </div>
              <div>
                <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">Target user</p>
                <p class="mt-2 text-sm leading-6 text-slate-700">{{ result.spec.targetUser }}</p>
              </div>
              <div class="md:col-span-2">
                <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">Problem</p>
                <p class="mt-2 text-sm leading-6 text-slate-700">{{ result.spec.problemStatement }}</p>
              </div>
            </div>
          </UCard>

          <div class="grid gap-5 lg:grid-cols-2">
            <UCard :ui="{ body: 'p-5' }">
              <template #header>
                <div class="flex items-center gap-2">
                  <Route class="size-5 text-primary-500" />
                  <h3 class="font-semibold text-slate-950">Workflow</h3>
                </div>
              </template>
              <ol class="space-y-3">
                <li v-for="(step, index) in result.spec.workflow" :key="step" class="flex gap-3">
                  <span class="grid size-7 shrink-0 place-items-center rounded-full bg-primary-50 text-xs font-semibold text-primary-700">
                    {{ index + 1 }}
                  </span>
                  <span class="text-sm leading-6 text-slate-700">{{ step }}</span>
                </li>
              </ol>
            </UCard>

            <UCard :ui="{ body: 'p-5' }">
              <template #header>
                <div class="flex items-center gap-2">
                  <Wrench class="size-5 text-primary-500" />
                  <h3 class="font-semibold text-slate-950">Tools</h3>
                </div>
              </template>
              <div class="space-y-3">
                <div v-for="tool in result.spec.tools" :key="tool.name" class="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p class="font-medium text-slate-950">{{ tool.name }}</p>
                  <p class="mt-1 text-sm leading-6 text-slate-600">{{ tool.purpose }}</p>
                </div>
              </div>
            </UCard>
          </div>

          <div class="grid gap-5 lg:grid-cols-2">
            <UCard :ui="{ body: 'p-5' }">
              <template #header>
                <div class="flex items-center gap-2">
                  <ShieldCheck class="size-5 text-primary-500" />
                  <h3 class="font-semibold text-slate-950">Human review gates</h3>
                </div>
              </template>
              <div class="space-y-3">
                <div v-for="gate in result.spec.humanReviewGates" :key="gate.name" class="rounded-2xl border border-slate-200 p-4">
                  <p class="font-medium text-slate-950">{{ gate.name }}</p>
                  <p class="mt-1 text-sm leading-6 text-slate-600">{{ gate.when }}</p>
                  <p class="mt-2 text-xs font-medium text-slate-500">{{ gate.decision }}</p>
                </div>
              </div>
            </UCard>

            <UCard :ui="{ body: 'p-5' }">
              <template #header>
                <div class="flex items-center gap-2">
                  <ListChecks class="size-5 text-primary-500" />
                  <h3 class="font-semibold text-slate-950">Implementation plan</h3>
                </div>
              </template>
              <div class="space-y-3">
                <div v-for="item in result.spec.implementationPlan" :key="item.step" class="rounded-2xl border border-slate-200 p-4">
                  <p class="font-medium text-slate-950">{{ item.step }}</p>
                  <p class="mt-1 text-sm leading-6 text-slate-600">{{ item.outcome }}</p>
                </div>
              </div>
            </UCard>
          </div>

          <UCard class="border-amber-200 bg-amber-50/70" :ui="{ body: 'p-5 sm:p-6' }">
            <template #header>
              <div class="flex items-center gap-2">
                <SearchCheck class="size-5 text-amber-600" />
                <h3 class="font-semibold text-slate-950">Critic review</h3>
              </div>
            </template>
            <div class="space-y-6">
              <div>
                <p class="text-xs font-semibold uppercase tracking-wide text-amber-700">Biggest concern</p>
                <p class="mt-2 text-sm leading-6 text-slate-800">{{ result.critique.biggestConcern }}</p>
              </div>
              <div class="grid gap-5 md:grid-cols-2">
                <div>
                  <p class="text-sm font-semibold text-slate-950">Missing risks</p>
                  <ul class="mt-3 space-y-2">
                    <li v-for="risk in result.critique.missingRisks" :key="risk" class="flex gap-2 text-sm leading-6 text-slate-700">
                      <Dot class="mt-1 size-4 shrink-0 text-amber-600" />
                      <span>{{ risk }}</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <p class="text-sm font-semibold text-slate-950">Recommended revision</p>
                  <ul class="mt-3 space-y-2">
                    <li v-for="revision in result.critique.recommendedNextRevision" :key="revision" class="flex gap-2 text-sm leading-6 text-slate-700">
                      <Dot class="mt-1 size-4 shrink-0 text-amber-600" />
                      <span>{{ revision }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </UCard>
        </div>
      </section>
    </section>
  </main>
</template>
