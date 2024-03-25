<script setup lang="ts">
import type { VocabEntry } from "~/types/word";

const route = useRoute();
const currentWord = ref<VocabEntry | null>(null);

const toast = useToast();

try {
  const response = await useFetch<VocabEntry>(`/api/vocab/${route.params.word}`);
  currentWord.value = response.data.value;
} catch {
  toast.add({
    title: "Error",
    color: "red",
    description: "Failed to fetch word",
  });
}
</script>

<template>
  <div class="w-full h-full flex flex-col items-stretch justify-center gap-16 max-w-2xl ml-auto mr-auto">
    <UCard :v-if="currentWord !== null" class="flex flex-col gap-3">
      <div class="font-bold">{{ currentWord.spanish }}</div>
      <div>{{ currentWord.english }}</div>
      <div v-if="currentWord.notes">Notes: {{ JSON.stringify(currentWord.notes) }}</div>
    </UCard>
  </div>
</template>
