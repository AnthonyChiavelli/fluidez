<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useStore } from "~/store/store";
import type { VocabEntry } from "~/types/word";

const store = useStore();
const { updateVocab } = store;
const { vocab } = storeToRefs(store);

const contextMenuOpen = ref(false);
const selectedWordId = ref<undefined | string>(undefined);
const virtualElement = ref({ getBoundingClientRect: () => ({}) });
const { x, y } = useMouse();
const { y: windowY } = useWindowScroll();
function onContextMenu(stuff) {
  const top = unref(y) - unref(windowY);
  const left = unref(x);
  virtualElement.value.getBoundingClientRect = () => ({
    width: 0,
    height: 0,
    top,
    left,
  });
  selectedWordId.value = stuff.target.dataset.wordId;
  contextMenuOpen.value = true;
}

const deleteWord = async () => {
  contextMenuOpen.value = false;
  try {
    await $fetch(`/api/vocab/delete/${selectedWordId.value}`, {
      method: "DELETE",
    });
    updateVocab(vocab.value.filter((vocabItem: VocabEntry) => selectedWordId.value !== vocabItem.id));
  } catch (e) {
    console.error(e);
  } finally {
    selectedWordId.value = undefined;
  }
};

try {
  const vocabList = await useFetch<{ vocabEntries: Array<VocabEntry> }>("/api/vocab/list");
  updateVocab(vocabList.data.value?.vocabEntries);
} catch (e) {
  console.error(e);
}
</script>

<template>
  <aside class="w-64 border-r p-3">
    <div class="text-2xl mb-5">Words</div>
    <div class="mb-5">
      <NuxtLink class="text-green-600" to="/"><span>Add Vocab</span></NuxtLink>
    </div>
    <div v-for="vocabItem in vocab" class="flex flex-col gap-5">
      <div
        :key="vocabItem.id"
        class="text-lg flex flex-row items-center justify-between"
        @contextmenu.prevent="onContextMenu"
      >
        <NuxtLink
          :data-word-id="vocabItem.id"
          class="truncate"
          :to="`/vocab/${vocabItem.spanish.replace(/ /g, '-')}`"
          >{{ vocabItem.spanish }}</NuxtLink
        >
        <UBadge class="ml-2" size="xs" :color="vocabItem.vocabEntryType === 'Word' ? 'primary' : 'cyan'">{{
          vocabItem.vocabEntryType
        }}</UBadge>
      </div>
    </div>
    <UContextMenu v-model="contextMenuOpen" :virtual-element="virtualElement">
      <div class="p-4" @click="deleteWord">Delete</div>
    </UContextMenu>
  </aside>
</template>
~/store/store
