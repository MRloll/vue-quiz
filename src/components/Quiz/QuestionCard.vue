<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
    <div class="mb-6">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white">
          {{ currentQuestion.question }}
        </h2>
        <span
          class="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
        >
          {{
            currentQuestion.type === "single"
              ? "Single Answer"
              : "Multiple Answers"
          }}
        </span>
      </div>

      <div
        v-if="currentQuestion.type === 'multiple'"
        class="text-sm text-amber-600 dark:text-amber-400 mb-4 flex items-center"
      >
        <AlertCircle class="w-4 h-4 me-1" />
        Select more than one answer
      </div>
    </div>

    <!-- Answer Options -->
    <div class="space-y-3 mb-8">
      <div
        v-for="(option, index) in currentQuestion.options"
        :key="index"
        class="relative"
      >
        <label
          class="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700"
          :class="{
            'border-blue-500 bg-blue-50 dark:bg-blue-900/20':
              isSelected(option),
            'border-green-500 bg-green-50 dark:bg-green-900/20':
              showFeedback && isCorrect(option),
            'border-red-500 bg-red-50 dark:bg-red-900/20':
              showFeedback && isSelected(option) && !isCorrect(option),
            'border-gray-200 dark:border-gray-600':
              !showFeedback && !isSelected(option),
          }"
        >
          <input
            v-if="currentQuestion.type === 'single'"
            type="radio"
            :value="option"
            v-model="selectedAnswers[0]"
            :disabled="showFeedback"
            class="sr-only"
          />
          <input
            v-else
            type="checkbox"
            :value="option"
            v-model="selectedAnswers"
            :disabled="showFeedback"
            class="sr-only"
          />

          <div class="flex items-center w-full">
            <div
              class="w-5 h-5 me-3 border-2 rounded transition-colors duration-200"
              :class="{
                'border-blue-500 bg-blue-500':
                  isSelected(option) && !showFeedback,
                'border-green-500 bg-green-500':
                  showFeedback && isCorrect(option),
                'border-red-500 bg-red-500':
                  showFeedback && isSelected(option) && !isCorrect(option),
                'border-gray-300 dark:border-gray-600':
                  !isSelected(option) && !showFeedback,
                'rounded-full': currentQuestion.type === 'single',
              }"
            >
              <Check
                v-if="
                  (isSelected(option) && !showFeedback) ||
                  (showFeedback && isCorrect(option))
                "
                class="w-3 h-3 text-white m-0.5"
              />
              <X
                v-if="showFeedback && isSelected(option) && !isCorrect(option)"
                class="w-3 h-3 text-white m-0.5"
              />
            </div>
            <span class="text-gray-800 dark:text-white font-medium">{{
              option
            }}</span>
          </div>
        </label>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex justify-between">
      <div>
        <button
          v-if="showFeedback"
          @click="nextQuestion"
          class="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          {{
            currentQuestionIndex === questions.length - 1
              ? "Finish Quiz"
              : "Next Question"
          }}
        </button>
      </div>
      <div>
        <button
          v-if="!showFeedback"
          @click="submitAnswer"
          :disabled="!hasSelectedAnswer"
          class="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          Submit Answer
        </button>
      </div>
    </div>

    <!-- Feedback -->
    <div
      v-if="showFeedback"
      class="mt-6 p-4 rounded-lg"
      :class="
        isAnswerCorrect
          ? 'bg-green-100 dark:bg-green-900/20 border border-green-300 dark:border-green-700'
          : 'bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700'
      "
    >
      <div class="flex items-center">
        <CheckCircle
          v-if="isAnswerCorrect"
          class="w-5 h-5 text-green-600 me-2"
        />
        <XCircle v-else class="w-5 h-5 text-red-600 me-2" />
        <span
          class="font-semibold"
          :class="
            isAnswerCorrect
              ? 'text-green-800 dark:text-green-200'
              : 'text-red-800 dark:text-red-200'
          "
        >
          {{ isAnswerCorrect ? "Correct!" : "Incorrect!" }}
        </span>
      </div>
      <div
        v-if="!isAnswerCorrect"
        class="mt-2 text-sm"
        :class="'text-red-700 dark:text-red-300'"
      >
        Correct answer{{
          currentQuestion.correctAnswers.length > 1 ? "s" : ""
        }}:
        {{ currentQuestion.correctAnswers.join(", ") }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { CheckCircle, XCircle, Check, X, AlertCircle } from "lucide-vue-next";
  import { storeToRefs } from "pinia";
  import { useQuizStore } from "../../stores/quizStore";

  const quizStore = useQuizStore();
  const {
    currentQuestion,
    currentQuestionIndex,
    selectedAnswers,
    questions,
    showFeedback,
    isAnswerCorrect,
    hasSelectedAnswer,
  } = storeToRefs(quizStore);
  const { isSelected, isCorrect, submitAnswer, nextQuestion } = quizStore;
</script>
