export interface Question {
  id: number;
  type: string;
  question: string;
  options: string[];
  correctAnswers: string[];
}

export interface QuizResults {
  score: number;
  total: number;
  percentage: number;
  completedAt: string;
}
