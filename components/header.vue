<script setup lang="ts">
const authCookie = useCookie("auth");
const loggedIn = ref(!!authCookie.value);

const onLogOut = async () => {
  const router = useRouter();
  try {
    await $fetch(`/api/logout`, {
      method: "POST",
    });
    location.pathname = "/login";
    router.push("/login");
  } catch (e) {
    alert("Failed to log out");
  }
};
</script>

<template>
  <header class="absolute top-0 right-0 left-0 h-16 bg-teal-400">
    <nav class="flex flex-row items-center h-full pl-10 gap-5">
      <nuxt-link to="/" class="text-slate-900">Home</nuxt-link>
      <nuxt-link to="/settings" class="text-slate-900">Study</nuxt-link>
      <div v-if="loggedIn" class="text-slate-900 cursor-pointer" @click="onLogOut">Logout</div>
      <nuxt-link v-if="!loggedIn" to="/login" class="text-slate-900">Login</nuxt-link>
    </nav>
  </header>
</template>
