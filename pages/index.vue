<script setup lang="ts">
import { useStore } from "~/store/store";
import type { VocabEntry } from "~/types/word";

const store = useStore();
const { addVocab } = store;

const toast = useToast();

const formState = ref<VocabEntry>({
  english: "",
  spanish: "",
  notes: "",
  vocabEntryType: "Word",
});
const loadingVocabSubmit = ref(false);

async function onSubmit(event) {
  loadingVocabSubmit.value = true;
  try {
    const response = await $fetch(`/api/vocab/add`, {
      method: "POST",
      body: JSON.stringify(event.data),
    });
    addVocab(response);
    formState.value = {
      english: "",
      spanish: "",
      notes: "",
      vocabEntryType: "Word",
    };
  } catch (e) {
    toast.add({
      title: "Error",
      color: "red",
      description: e.message,
    });
  } finally {
    loadingVocabSubmit.value = false;
  }
}
</script>

<template>
  <ClientOnly>
    <div class="w-full h-full flex flex-col items-stretch justify-center gap-16 max-w-2xl ml-auto mr-auto">
      <UCard>
        <UForm class="flex flex-col gap-3" :state="formState" @submit="onSubmit">
          <UInput v-model="formState.spanish" placeholder="Spanish" label="Spanish" class="w-full" required />
          <UInput v-model="formState.english" placeholder="English" class="w-full" required />
          <UTextarea v-model="formState.notes" :placeholder="`Notes`" class="w-full" />
          <URadioGroup
            v-model="formState.vocabEntryType"
            :options="[
              { label: 'Word', value: 'Word' },
              { label: 'Phrase', value: 'Phrase' },
            ]"
          />
          <UButton
            class="mt-2 flex items-center justify-center"
            type="submit"
            color="black"
            :loading="loadingVocabSubmit"
          >
            Save {{ formState.vocabEntryType }}
          </UButton>
        </UForm>
      </UCard>
    </div>
  </ClientOnly>
</template>
