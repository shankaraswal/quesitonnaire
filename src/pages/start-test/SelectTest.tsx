import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { twMerge } from 'tailwind-merge';

import { Button } from '../../components';
import { testsTypes } from '../../constants';
import { useLazyFetchQuestionnaireQuery } from '../../features/questionnaire/questionnaireApi';
import {
  setMetadata,
  setQuestionnaireData,
} from '../../features/questionnaire/questionnaireSlice';
import { AppDispatch } from '../../store';
import { modifyRandomQuestionstype } from '../questionnaire/questionnaire.utils';

const SelectTest: React.FC<{ onFetchComplete: (data: boolean) => void }> = ({
  onFetchComplete,
}) => {
  const dispatch: AppDispatch = useDispatch();

  const [selectedTest, setSelectedTest] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const [fetchQuestionnaireApi, { data: questionnaireResponse, isLoading }] =
    useLazyFetchQuestionnaireQuery();

  const handleTestTypeSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedTest(value);
    setError(null);
  };

  console.log(questionnaireResponse?.questions);

  const handleFetchData = async () => {
    if (!selectedTest) {
      setError('Please select a test type.');
      return;
    }
    try {
      await fetchQuestionnaireApi({
        limit: 10,
        category: selectedTest,
        difficulty: 'easy',
      });
    } catch (err) {
      setError('Failed to fetch data. Please try again.');
    }
  };

  //modifyRandomQuestionstype
  useEffect(() => {
    if (questionnaireResponse) {
      onFetchComplete(true);
      // Modify 2 random questions to `free_text`
      const modifiedQuestions = modifyRandomQuestionstype(
        questionnaireResponse.questions,
        'free_text',
        2
      );
      const questionnaireResponse_updated = {
        ...questionnaireResponse,
        questions: modifiedQuestions,
      };

      dispatch(setQuestionnaireData(questionnaireResponse_updated));
      const metadata = {
        questionnaire_id: questionnaireResponse_updated.id,
        questionnaire_title: questionnaireResponse_updated.title,
        questionnaire_description: questionnaireResponse_updated.description,
        user_name: questionnaireResponse_updated.unsplash_author_name,
        user_id: questionnaireResponse_updated.user_id,
        default_question_time_limit:
          questionnaireResponse_updated.default_question_time_limit,
        quiz_time_limit: questionnaireResponse_updated.quiz_time_limit,
      };
      dispatch(setMetadata(metadata));

      //  TODO: remove this once authentication is implemented
      localStorage.setItem('isLoggedin', 'true');
    }
  }, [questionnaireResponse, onFetchComplete]);

  return (
    <>
      <h1 className="text-largeSize text-center">Select Test</h1>
      <div className="border-sherpalBorderDefault text-baseSize relative mx-auto mt-6 flex w-[510px] flex-col items-center rounded-reg border-2 bg-sherpalAccentBgColor p-6 text-center shadow-custom">
        <div className="m-5 flex w-full flex-col">
          <h1 className="mb-10 text-h1 font-bold">Choose a test to start.</h1>
          <div className="mx-auto mt-12 flex w-full flex-col space-y-10">
            <select
              className="!border-sherpalReg w-full appearance-none rounded-xl border p-3 text-h2"
              value={selectedTest}
              onChange={handleTestTypeSelection}
            >
              <option value="">Select a Test</option>
              {testsTypes.map((item) => (
                <option
                  key={item.testid}
                  value={item.testid}
                  className="bg-sherpalAccentBgColor px-6 py-2"
                >
                  {item.label}
                </option>
              ))}
            </select>

            <Button
              className={twMerge('mx-auto', isLoading ? 'opacity-50' : '')}
              onClick={handleFetchData}
              variant="dark"
            >
              {isLoading ? 'loading...' : 'Start'}
            </Button>
          </div>
          {error && <p className="error-text text-baseSize mt-4">{error}</p>}
        </div>
      </div>
    </>
  );
};

export default SelectTest;
