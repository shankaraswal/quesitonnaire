import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { QuestionnaireData } from './questionnaire.types';

export interface UserAnswer {
  questionId: number;
  answerId: number | undefined;
  timeSpent: number;
  isMarked?: boolean;
}

interface QuestionnaireState {
  data: QuestionnaireData;
  currentStep: number;
  questionTimes: { questionId: number; timeSpent: number }[];
  totalTime: number;
  answers: UserAnswer[];
  metadata: {
    questionnaire_id: number | string | null;
    questionnaire_title: string;
    questionnaire_description: string;
    user_name: string;
    user_id: number | string | null;
    default_question_time_limit: number | string | null;
    quiz_time_limit: number | string | null;
  };
}

const initialState: QuestionnaireState = {
  data: {
    id: 0,
    title: '',
    description: '',
    unsplash_author_name: '',
    user_id: '',
    default_question_time_limit: '',
    quiz_time_limit: '',
    questions: [],
  },
  currentStep: 0,
  questionTimes: [],
  totalTime: 0,
  answers: [],
  metadata: {
    questionnaire_id: null,
    questionnaire_title: '',
    questionnaire_description: '',
    user_name: '',
    user_id: null,
    default_question_time_limit: null,
    quiz_time_limit: null,
  },
};

const questionnaireSlice = createSlice({
  name: 'questionnaire',
  initialState,
  reducers: {
    setQuestionnaireData(state, action: PayloadAction<QuestionnaireData>) {
      state.data = action.payload;
    },
    setMetadata(state, action: PayloadAction<QuestionnaireState['metadata']>) {
      state.metadata = action.payload;
    },
    setCurrentStep(state, action: PayloadAction<number>) {
      state.currentStep = action.payload;
    },
    incrementQuestionTime(
      state,
      action: PayloadAction<{ questionId: number; timeSpent: number }>
    ) {
      const { questionId, timeSpent } = action.payload;
      const existing = state.questionTimes.find(
        (q) => q.questionId === questionId
      );
      if (existing) {
        existing.timeSpent += timeSpent;
      } else {
        state.questionTimes.push({ questionId, timeSpent });
      }
    },
    incrementTotalTime(state, action: PayloadAction<number>) {
      state.totalTime += action.payload;
    },

    updateAnswer(
      state,
      action: PayloadAction<{
        questionId: number;
        answerId?: number;
        isMarked?: boolean;
      }>
    ) {
      const { questionId, answerId, isMarked } = action.payload;

      const existingAnswer = state.answers.find(
        (ans) => Number(ans.questionId) === Number(questionId)
      );

      if (existingAnswer) {
        // Update only the necessary fields
        if (answerId !== undefined) existingAnswer.answerId = answerId;
        if (isMarked !== undefined) existingAnswer.isMarked = isMarked;
      } else {
        // Add a new entry if none exists
        state.answers.push({
          questionId: Number(questionId),
          answerId: Number(answerId) ?? undefined,
          isMarked: isMarked ?? false,
          timeSpent: 0,
        });
      }
    },

    resetQuestionnaire(state) {
      state.currentStep = 0;
      state.questionTimes = [];
      state.totalTime = 0;
      state.answers = [];
    },
  },
});

export const {
  setQuestionnaireData,
  setMetadata,
  setCurrentStep,
  incrementQuestionTime,
  incrementTotalTime,
  updateAnswer,
  resetQuestionnaire,
} = questionnaireSlice.actions;

export default questionnaireSlice.reducer;
