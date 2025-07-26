<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
    <div class="flex justify-between items-center mb-4">
      <div class="flex items-center space-x-2">
        <Clock class="w-5 h-5 text-blue-600" />
        <span class="font-semibold text-gray-800 dark:text-white">
          {{ $t("time_remaining") }} {{ formatSecondsToTime(timeRemaining) }}
        </span>
      </div>
      <div class="text-sm text-gray-600 dark:text-gray-300">
        {{ $t("question") }} {{ currentQuestionIndex + 1 }} of
        {{ questions.length }}
      </div>
    </div>

    <div
      class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden"
    >
      <div
        class="bg-blue-600 h-2 rounded-full transition-all duration-1000 ease-out"
        :style="{
          width: `${progressWidth}%`,
        }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from "vue";

  import { Clock } from "lucide-vue-next";
  import { storeToRefs } from "pinia";
  import { useQuizStore } from "../../stores/quizStore";
  import { formatSecondsToTime } from "../../utils";

  const quizStore = useQuizStore();
  const { timeRemaining, currentQuestionIndex, questions } =
    storeToRefs(quizStore);

  const progressWidth = computed(() => {
    return ((currentQuestionIndex.value + 1) / questions.value.length) * 100;
  });
</script>
