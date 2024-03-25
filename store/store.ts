// store/filters.ts
import { defineStore } from "pinia";

export const useStore = defineStore("store", {
  state: () => {
    return {
      vocab: [],
    };
  },
  actions: {
    updateVocab(values: string[]) {
      this.vocab = values;
    },
    addVocab(value: string) {
      this.vocab.push(value);
    },
  },
  getters: {
    getVocab: (state) => state.vocab,
  },
});
