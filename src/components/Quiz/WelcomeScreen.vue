<template>
  <div class="text-center">
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
      <h1 class="text-4xl font-bold text-gray-800 dark:text-white mb-4">
        {{ $t("quiz") }}
      </h1>
      <p class="text-gray-600 dark:text-gray-300 mb-6 text-lg">
        {{ $t("test_urself") }}
      </p>
      <button
        @click="startQuiz"
        class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 text-lg"
      >
        {{ $t("start_quiz") }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useQuizStore } from "../../stores/quizStore";

  const quizStore = useQuizStore();
  const { startQuiz } = quizStore;
</script>
