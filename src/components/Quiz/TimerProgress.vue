<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
    <div class="flex justify-between items-center mb-4">
      <div class="flex items-center space-x-2">
        <Clock class="w-5 h-5 text-blue-600" />
        <span class="font-semibold text-gray-800 dark:text-white">
          Time Remaining: {{ formatSecondsToTime(timeRemaining) }}
        </span>
      </div>
      <div class="text-sm text-gray-600 dark:text-gray-300">
        Question {{ currentQuestionIndex + 1 }} of {{ questions.length }}
      </div>
    </div>

    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
      <div
        class="bg-blue-600 h-2 rounded-full transition-all duration-300"
        :style="{
          width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
        }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Clock } from "lucide-vue-next";
  import { storeToRefs } from "pinia";
  import { useQuizStore } from "../../stores/quizStore";
  import { formatSecondsToTime } from "../../utils";

  const quizStore = useQuizStore();
  const { timeRemaining, currentQuestionIndex, questions } =
    storeToRefs(quizStore);
</script>
