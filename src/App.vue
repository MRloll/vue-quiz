<template>
  <div
    class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
  >
    <div ref="app">
      <div class="absolute top-4 start-4 flex gap-2">
        <DarkModeToggle />
        <SwitchLang />
      </div>
      <div class="container mx-auto px-4 py-8 max-w-4xl">
        <Transition name="fade" mode="out-in">
          <WelcomeScreen v-if="!quizStarted && !quizCompleted" />
          <QuizInterface v-else-if="quizStarted && !quizCompleted" />
          <ResultsScreen v-else-if="quizCompleted" />
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useTemplateRef } from "vue";
  import { storeToRefs } from "pinia";
  import { useQuizStore } from "./stores/quizStore";
  import { usePageLoadAnimation } from "./composables/useAnimations";

  import DarkModeToggle from "./components/shared/DarkModeToggle.vue";
  import SwitchLang from "./components/shared/SwitchLang.vue";
  import WelcomeScreen from "./components/Quiz/WelcomeScreen.vue";
  import QuizInterface from "./components/Quiz/QuizInterface.vue";
  import ResultsScreen from "./components/Quiz/ResultsScreen.vue";

  const quizStore = useQuizStore();
  const { quizStarted, quizCompleted } = storeToRefs(quizStore);

  const app = useTemplateRef("app");
  const pageLoad = usePageLoadAnimation(app);
</script>
