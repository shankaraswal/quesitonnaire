import { QuestionDataType } from 'src/features/questionnaire/questionnaire.types';

import QuestionCard from './QuestionCard';
import QuestionnaireComplete from './QuestionnaireComplete';
import QuestionnaireReview from './QuestionnaireReview';

const QuestionnaireStep = ({
  step,
  currentStep,
  questions,
  handleOptionSelect,
  selectedAnswers,
  handleCheckboxChange,
  disabledOptions,
}: {
  step: { type: string };
  currentStep: number;
  questions: QuestionDataType[];
  handleOptionSelect: (option: string | number) => void;
  selectedAnswers: { [key: string]: string | number | boolean };
  handleCheckboxChange: (option: string | number) => void;
  disabledOptions: Record<string, boolean>;
}) => {
  switch (step.type) {
    case 'review':
      return <QuestionnaireReview reviewpage />;
    case 'loader':
      return <QuestionnaireComplete />;
    default:
      return (
        <QuestionCard
          currentStep={currentStep}
          qdata={questions[currentStep]}
          onOptionSelect={handleOptionSelect}
          selectedAnswer={
            selectedAnswers[String(currentStep)] as string | number | undefined
          }
          onCheckboxChange={handleCheckboxChange}
          disabledOptions={disabledOptions}
        />
      );
  }
};
export default QuestionnaireStep;
