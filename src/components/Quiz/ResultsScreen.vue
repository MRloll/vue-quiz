<template>
  <div class="text-center">
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
      <div class="mb-6">
        <Trophy class="w-16 h-16 text-yellow-500 mx-auto mb-4" />
        <h2 class="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Quiz Completed!
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-300">
          You scored {{ score }} out of {{ questions.length }}
        </p>
      </div>

      <div class="mb-8">
        <div class="text-6xl font-bold mb-2" :class="getScoreColor()">
          {{ Math.round((score / questions.length) * 100) }}%
        </div>
        <p class="text-gray-600 dark:text-gray-300">
          {{ getScoreMessage() }}
        </p>
      </div>

      <div class="space-y-4">
        <button
          @click="restartQuiz"
          class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 me-4"
        >
          Restart Quiz
        </button>
        <button
          @click="exportResults"
          class="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
        >
          <Download class="w-4 h-4 inline me-2" />
          Export Results
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Trophy, Download } from "lucide-vue-next";
  import { storeToRefs } from "pinia";
  import { useQuizStore } from "../../stores/quizStore";

  const quizStore = useQuizStore();
  const { score, questions } = storeToRefs(quizStore);
  const { getScoreColor, getScoreMessage, restartQuiz, exportResults } =
    quizStore;
</script>
