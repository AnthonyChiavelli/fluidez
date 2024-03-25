<script setup lang="ts">
defineProps<{
  word: Word;
}>();
</script>

<template>
  <UCard>
    {{ JSON.stringify(word[0].definition) }}
  </UCard>
</template>
