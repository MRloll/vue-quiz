<template>
  <div>
    <button @click="toggleDarkMode" class="btn" aria-label="Toggle dark mode">
      <Sun v-if="isDarkMode" class="w-5 h-5 text-yellow-500" />
      <Moon v-else class="w-5 h-5 text-gray-600" />
    </button>
  </div>
</template>

<script setup lang="ts">
  import { Sun, Moon } from "lucide-vue-next";
  import { useToggleTheme } from "../../composables/useToggleTheme";

  const toggleTheme = useToggleTheme();
  const { isDarkMode, toggleDarkMode, initializeDarkMode } = toggleTheme;

  initializeDarkMode();
</script>
