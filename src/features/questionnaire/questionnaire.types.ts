// Interfaces for the api response data
export interface QuestionnaireProps {
  data: QuestionnaireData;
  loading: boolean;
  error: string | null;
}
// Interfaces for the questionnaire data
export interface QuestionnaireData {
  id: number;
  title: string;
  description: string;
  unsplash_author_name: string;
  user_id: string;
  default_question_time_limit: string;
  quiz_time_limit: string;
  questions: QuestionDataType[];
}

// interfaces for the question data type
export interface QuestionDataType {
  id: number;
  upload_chunk_id: null;
  quiz_id: number;
  type: string;
  text: string;
  number: number;
  points: number;
  created_at: Date;
  updated_at: Date;
  info: string;
  deleted_at: null;
  time_limit_seconds: null;
  language: null;
  image: null;
  subtopic: null;
  difficulty: null;
  upload_file_name: null;
  upload_snippet: null;
  upload_id: null;
  has_multiple_answers: boolean;
  shuffled_pairs: null;
  answers: AnswerDataType[];
}

// Interfaces for the answer data type
export interface AnswerDataType {
  id: number;
  question_id: number;
  text: string;
  order: number;
  correct: boolean;
  created_at: string;
  updated_at: string;
  type: string;
}

export type UpdateAnswer = (payload: {
  questionId: number;
  answerId: number | undefined;
}) => void;

export enum QuestionType {
  MultipleChoice = 'multiple_choice',
}

export interface QuestionCardProps {
  qdata: QuestionDataType;
  selectedAnswer?: number | string;
  currentStep?: number;
  onOptionSelect?: (item: string) => void;
  onMarkForReview?: (item: string) => void;
  onCheckboxChange?: (optionId: string) => void;
  disabledOptions?: Record<string, boolean>;
}
export interface PayloadDataType {
  questionId: number;
  answerId: number;
  timeSpent: number;
}

export interface FetchQuestionsParams {
  limit: number;
  category: string;
  difficulty: string;
}
