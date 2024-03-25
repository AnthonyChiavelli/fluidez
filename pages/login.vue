<script setup lang="ts">
const state = reactive({
  email: undefined,
  password: undefined,
});

const onSubmit = async () => {
  try {
    await $fetch(`/api/login`, {
      method: "POST",
      body: JSON.stringify(state),
    });
    location.pathname = "/";
  } catch (e) {
    alert("Authentication failed");
  }
};
</script>

<template>
  <div class="w-full h-full flex flex-row items-center justify-center gap-16">
    <UCard>
      <UForm :state="state" @submit="onSubmit">
        <UInput v-model="state.username" label="Username" />
        <UInput v-model="state.password" label="Password" />
        <UButton type="submit">Submit</UButton>
      </UForm>
    </UCard>
  </div>
</template>
