<script setup lang="ts">
onMounted(() => {
  document.documentElement.classList.remove('dark');
  document.documentElement.classList.add('light');
  document.documentElement.style.colorScheme = 'light';
  localStorage.setItem('nuxt-color-mode', 'light');
});
</script>

<template>
  <UApp>
    <NuxtPage />
  </UApp>
</template>
