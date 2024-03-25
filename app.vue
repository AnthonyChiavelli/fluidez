<template>
  <NuxtLayout>
    <NuxtPage :page-key="(route) => route.fullPath" />
    <UNotifications />
  </NuxtLayout>
</template>
