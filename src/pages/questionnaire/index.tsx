import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { paginationDirection } from 'src/constants';

import {
  QuestionCardFooter,
  QuestionCardHeader,
  QuestionCardTitle,
} from '../../components';
import {
  resetQuestionnaire,
  setCurrentStep,
} from '../../features/questionnaire/questionnaireSlice';
import { RootState } from '../../store';
import { handleOptionSelection, paginate } from './questionnaire.utils';
import QuestionnaireStep from './QuestionnaireStep';

const QuestionWrapper = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const questionnaireResponse = useSelector(
    (state: RootState) => state.questionnaireState
  );
  const {
    currentStep,
    data: { questions = [] } = {},
    answers,
    metadata: questionnaireMetadata,
  } = questionnaireResponse;

  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string>
  >({});
  const [disabledOptionsPerQuestion, setDisabledOptionsPerQuestion] = useState<
    Record<number, Record<string, boolean>>
  >({});
  const currentDisabledOptions = disabledOptionsPerQuestion[currentStep] || {};

  const steps = [
    ...questions,
    { id: 'review', type: 'review' },
    { id: 'loader', type: 'loader' },
  ];

  const handleOptionSelect = (item: string | number) => {
    const selectedAnswer = handleOptionSelection(
      String(item),
      currentStep,
      questions,
      dispatch
    );
    setSelectedAnswers((prev) => ({
      ...prev,
      [String(currentStep)]: selectedAnswer || '',
    }));
  };

  const handleCheckboxChange = (optionId: string | number) => {
    setDisabledOptionsPerQuestion((prev) => ({
      ...prev,
      [currentStep]: {
        ...prev[currentStep],
        [String(optionId)]: !prev[currentStep]?.[String(optionId)],
      },
    }));
  };

  const handlePaginate = (newDirection: keyof typeof paginationDirection) => {
    const newStep = paginate(
      newDirection,
      currentStep,
      questions,
      answers,
      selectedAnswers,
      dispatch
    );

    if (newStep >= 0 && newStep < steps.length) {
      dispatch(setCurrentStep(newStep));
    }
    if (newStep === steps.length - 1) {
      console.log({
        ...questionnaireMetadata,
        answers,
      });
    }
  };

  const handleSubmit = async () => {
    dispatch(setCurrentStep(currentStep + 1));
    try {
      const payload = {
        ...questionnaireMetadata,
        answers,
      };
      await new Promise((resolve) => setTimeout(resolve, 5000));
      console.log({ PAYLOAD: payload });
      dispatch(resetQuestionnaire());
      navigate('/break');
    } catch (error) {
      console.error('Submission failed:', error);
    }
  };
  return (
    <div className="min-h-screen !w-full">
      <div className="align-items-center w-full">
        {currentStep < questions.length + 1 && (
          <>
            <QuestionCardHeader />
            <QuestionCardTitle length={questions.length} />
          </>
        )}
        <div className="full-screen">
          <QuestionnaireStep
            step={steps[currentStep]}
            currentStep={currentStep}
            questions={questions}
            handleOptionSelect={handleOptionSelect}
            selectedAnswers={selectedAnswers}
            handleCheckboxChange={handleCheckboxChange}
            disabledOptions={currentDisabledOptions}
          />
        </div>
        {currentStep < questions.length + 1 && (
          <QuestionCardFooter
            reviewpage={steps[currentStep].type === 'review'}
            onPeginate={handlePaginate}
            onHandleSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default QuestionWrapper;
