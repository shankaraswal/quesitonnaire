import { Dispatch } from 'redux';
import type { QuestionDataType } from 'src/features/questionnaire/questionnaire.types';

import { paginationDirection } from '../../constants';
import {
  updateAnswer,
  UserAnswer,
} from '../../features/questionnaire/questionnaireSlice';

export const handleOptionSelection = (
  item: string | undefined,
  currentStep: number,
  questions: QuestionDataType[],
  dispatch: Dispatch
): string | undefined => {
  const selOpt = item ? JSON.parse(item) : null;
  const answerPayload: UserAnswer = {
    questionId: Number(questions[currentStep]?.id),
    answerId: selOpt ? Number(selOpt.id) : undefined,
    // TODO: store to total time spent on the question
    timeSpent: 0,
  };
  dispatch(updateAnswer(answerPayload));
  // TODO: store the selected answer in the state: single select, multi select and free response
  return selOpt ? String(selOpt.id) : undefined;
};

// Paginate between questions
export const paginate = (
  direction: keyof typeof paginationDirection,
  currentStep: number,
  questions: QuestionDataType[],
  answers: UserAnswer[],
  selectedAnswers: Record<string, string | undefined>,
  dispatch: Dispatch
) => {
  const newStep = direction === 'NEXT' ? currentStep + 1 : currentStep - 1;
  if (direction === 'NEXT') {
    const currentAnswer = answers.find(
      (answer) =>
        Number(answer.questionId) === Number(questions[currentStep].id)
    );
    const payload = {
      questionId: Number(questions[currentStep].id),
      answerId:
        selectedAnswers[String(currentStep)] !== undefined
          ? Number(selectedAnswers[String(currentStep)])
          : currentAnswer?.answerId,
      isMarked: currentAnswer?.isMarked ?? false,
    };
    dispatch(updateAnswer(payload));
  }
  return newStep;
};

// TODO: temp function to updat type property of random questions
export const modifyRandomQuestionstype = (
  questions: QuestionDataType[],
  newType: string,
  count: number
) => {
  const randomIndices = new Set<number>();
  while (randomIndices.size < Math.min(count, questions.length)) {
    const randomIndex = Math.floor(Math.random() * questions.length);
    randomIndices.add(randomIndex);
  }

  return questions.map((question, index) => {
    if (randomIndices.has(index)) {
      return {
        ...question,
        type: newType,
      };
    }
    return question;
  });
};
