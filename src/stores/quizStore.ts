import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Question, QuizResults } from "../types";
import { quizData } from "../data/questions";
import { shuffleArray, exportResultsHelper } from "../utils";
export const useQuizStore = defineStore("quiz", () => {
  // State
  const questions = ref<Question[]>([]);
  const currentQuestionIndex = ref(0);
  const selectedAnswers = ref<string[]>([]);
  const score = ref(0);
  const quizStarted = ref(false);
  const quizCompleted = ref(false);
  const showFeedback = ref(false);
  const isAnswerCorrect = ref(false);
  const timeRemaining = ref(300); // 5 minutes in seconds
  const timer = ref<NodeJS.Timeout | null>(null);

  // Getters
  const currentQuestion = computed<Question>(
    () => questions.value[currentQuestionIndex.value]
  );

  const hasSelectedAnswer = computed<boolean>(() => {
    return selectedAnswers.value.length > 0;
  });

  // Actions
  const startQuiz = (): void => {
    questions.value = quizData.map((q) => ({
      ...q,
      options: shuffleArray(q.options),
    }));
    quizStarted.value = true;
    selectedAnswers.value = [];
    startTimer();
  };

  const startTimer = (): void => {
    timer.value = setInterval(() => {
      timeRemaining.value--;
      if (timeRemaining.value <= 0) {
        endQuiz();
      }
    }, 1000);
  };

  const isSelected = (option: string): boolean => {
    if (currentQuestion.value.type === "single") {
      return selectedAnswers.value[0] === option;
    }
    return selectedAnswers.value.includes(option);
  };

  const isCorrect = (option: string): boolean => {
    return currentQuestion.value.correctAnswers.includes(option);
  };

  const submitAnswer = (): void => {
    showFeedback.value = true;

    if (currentQuestion.value.type === "single") {
      isAnswerCorrect.value = currentQuestion.value.correctAnswers.includes(
        selectedAnswers.value[0]
      );
    } else {
      const selectedSet = new Set(selectedAnswers.value);
      const correctSet = new Set(currentQuestion.value.correctAnswers);
      isAnswerCorrect.value =
        selectedSet.size === correctSet.size &&
        [...selectedSet].every((answer) => correctSet.has(answer));
    }

    if (isAnswerCorrect.value) {
      score.value++;
    }
  };

  const nextQuestion = (): void => {
    if (currentQuestionIndex.value < questions.value.length - 1) {
      currentQuestionIndex.value++;
      selectedAnswers.value = [];
      showFeedback.value = false;
      isAnswerCorrect.value = false;
    } else {
      endQuiz();
    }
  };

  const endQuiz = (): void => {
    quizCompleted.value = true;
    quizStarted.value = false;
    if (timer.value) {
      clearInterval(timer.value);
    }
  };

  const restartQuiz = (): void => {
    currentQuestionIndex.value = 0;
    selectedAnswers.value = [];
    score.value = 0;
    quizStarted.value = false;
    quizCompleted.value = false;
    showFeedback.value = false;
    isAnswerCorrect.value = false;
    timeRemaining.value = 300;
    if (timer.value) {
      clearInterval(timer.value);
    }
  };

  const getScoreColor = (): string => {
    const percentage = (score.value / questions.value.length) * 100;
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreMessage = (): string => {
    const percentage = (score.value / questions.value.length) * 100;
    if (percentage >= 90) return "Excellent! Outstanding performance!";
    if (percentage >= 80) return "Great job! Well done!";
    if (percentage >= 70) return "Good work! Keep it up!";
    if (percentage >= 60) return "Not bad! Room for improvement.";
    return "Keep studying and try again!";
  };

  const exportResults = (): void => {
    const results: QuizResults = {
      score: score.value,
      total: questions.value.length,
      percentage: Math.round((score.value / questions.value.length) * 100),
      completedAt: new Date().toISOString(),
    };
    exportResultsHelper(results, "QuizResults.json");
  };

  return {
    // State
    questions,
    currentQuestionIndex,
    selectedAnswers,
    score,
    quizStarted,
    quizCompleted,
    showFeedback,
    isAnswerCorrect,
    timeRemaining,

    // Getters
    currentQuestion,
    hasSelectedAnswer,

    // Actions
    startQuiz,
    isSelected,
    isCorrect,
    submitAnswer,
    nextQuestion,
    restartQuiz,
    getScoreColor,
    getScoreMessage,
    exportResults,
  };
});
