<template>
  <div class="text-center">
    <div
      class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 relative overflow-hidden"
    >
      <div
        v-for="(confetti, index) in confettiElements"
        :key="index"
        class="confetti"
        :style="{ ...confetti.style }"
      ></div>

      <div class="mb-6">
        <Trophy class="w-16 h-16 text-yellow-500 mx-auto mb-4 animate-bounce" />
        <h2 class="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          {{ $t("quiz_completed") }}
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-300">
          {{ $t("scored") + " " + score + " / " + questions.length }}
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
          {{ $t("restart") }}
        </button>
        <button
          @click="exportResults"
          class="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
        >
          <Download class="w-4 h-4 inline me-2" />
          {{ $t("export") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from "vue";
  import { Trophy, Download } from "lucide-vue-next";
  import { storeToRefs } from "pinia";
  import { useQuizStore } from "../../stores/quizStore";

  const quizStore = useQuizStore();
  const { score, questions } = storeToRefs(quizStore);
  const { getScoreColor, getScoreMessage, restartQuiz, exportResults } =
    quizStore;

  const confettiElements = ref<Array<{ style: object }>>([]);

  const createConfetti = () => {
    const colors = [
      "#ff0000",
      "#00ff00",
      "#0000ff",
      "#ffff00",
      "#ff00ff",
      "#00ffff",
    ];

    confettiElements.value = Array.from({ length: 50 }, () => {
      const color = colors[Math.floor(Math.random() * colors.length)];
      return {
        style: {
          backgroundColor: color,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${Math.random() * 10 + 5}px`,
          height: `${Math.random() * 10 + 5}px`,
          transform: `rotate(${Math.random() * 360}deg)`,
          opacity: Math.random() * 0.5 + 0.5,
          animationDuration: `${Math.random() * 3 + 2}s`,
          animationDelay: `${Math.random() * 0.5}s`,
        },
      };
    });
  };

  onMounted(() => {
    createConfetti();
  });
</script>

<style scoped>
  .confetti {
    position: absolute;
    border-radius: 2px;
    animation: confetti-fall linear forwards;
  }

  @keyframes confetti-fall {
    0% {
      transform: translateY(-100vh) rotate(0deg);
    }
    100% {
      transform: translateY(100vh) rotate(360deg);
    }
  }

  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
  }

  .animate-bounce {
    animation: bounce 1s infinite;
  }
</style>
