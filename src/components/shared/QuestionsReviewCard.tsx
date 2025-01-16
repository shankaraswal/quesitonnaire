import { GrLocation } from 'react-icons/gr';
import { IoBookmark } from 'react-icons/io5';
import { LuSquareDashed } from 'react-icons/lu';
import { useDispatch, useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';

import { Button } from '../../components';
import { setCurrentStep } from '../../features/questionnaire/questionnaireSlice';
import type { AppDispatch, RootState } from '../../store';

const QuestionsReviewCard = ({ reviewpage }: { reviewpage: boolean }) => {
  const dispatch: AppDispatch = useDispatch();
  const {
    currentStep,
    metadata: questionnaireMetadata,
    answers,
    data: { questions },
  } = useSelector((state: RootState) => state.questionnaireState);

  const handleGotoStep = (newStep: number) => {
    dispatch(setCurrentStep(newStep));
  };

  const isQuestionAnswered = (questionId: number) => {
    const answer = answers.find((ans) => ans.questionId === questionId);
    return typeof answer?.answerId === 'number' && !!answer.answerId;
  };

  const isQuestionMarked = (questionId: number) => {
    const answer = answers.find((ans) => ans.questionId === questionId);
    return answer?.isMarked === true;
  };

  return (
    <div className="flex flex-col bg-sherpalNeutralBgColor">
      {!reviewpage && (
        <h2 className="mx-6 mb-6 flex-grow text-center font-sherpalReg text-h2 font-bold">
          {questionnaireMetadata.questionnaire_title}
        </h2>
      )}
      <div className="justify-around2 flex items-center">
        <div
          className={twMerge(
            'mx-auto my-2 flex w-full flex-row items-center gap-4 border-y-2 border-gray-200 py-6',
            reviewpage ? 'flex w-full flex-row !border-t-0' : 'justify-center'
          )}
        >
          {reviewpage && (
            <h2 className="flex-grow text-left font-sherpalReg text-h2 font-semibold tracking-wider">
              {questionnaireMetadata.questionnaire_title}
            </h2>
          )}
          {!reviewpage && (
            <span className="flex flex-row items-center gap-2">
              <GrLocation />
              Current
            </span>
          )}
          <span
            className={twMerge(
              'flex flex-row items-center gap-2',
              reviewpage ? 'w-fit' : ''
            )}
          >
            <LuSquareDashed />
            Unanswered
          </span>
          <span
            className={twMerge(
              'flex flex-row items-center gap-2',
              reviewpage ? 'w-fit' : ''
            )}
          >
            <IoBookmark size={25} color="#c43e36" />
            For review
          </span>
        </div>
      </div>
      <div className="mt-4">
        <div
          className={twMerge(
            'flex flex-wrap justify-center gap-y-[18px]',
            reviewpage ? 'gap-x-[30px]' : 'gap-x-[22px] px-3'
          )}
        >
          {questions.map((item, index) => (
            <button
              value={String(item?.id)}
              key={String(item?.id)}
              className={twMerge(
                'flex cursor-pointer flex-col items-center justify-center transition-all duration-300 hover:scale-110',
                'aspect-square h-[40px] w-[40px] border !border-dotted !border-sherpalPrimaryBordergColor text-center',
                'relative flex flex-col items-center justify-center gap-2',
                isQuestionAnswered(item.id)
                  ? 'bg-sherpalSecondaryBgColor text-white'
                  : 'bg-sherpalNeutralBgColor text-sherpalPrimaryTextColor'
              )}
              onClick={() => handleGotoStep(index)}
            >
              <div
                className={twMerge(
                  'absolute -right-2 -top-2',
                  isQuestionMarked(item.id) ? 'block' : 'hidden'
                )}
              >
                <IoBookmark size={15} color="#c43e36" />
              </div>
              <div
                className={twMerge(
                  'absolute -top-5',
                  index === currentStep && !reviewpage ? 'block' : 'hidden'
                )}
              >
                <GrLocation
                  size={20}
                  className="text-sherpalSecondaryTextColor"
                />
              </div>
              <span
                className={twMerge(
                  '!text-h1 font-semibold',
                  isQuestionAnswered(item.id)
                    ? 'text-white'
                    : 'text-sherpalPrimaryTextColor'
                )}
              >
                {index + 1}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="text-center">
        {currentStep < questions.length && (
          <Button
            className="border-sherpalSecondaryBorderColor !text-baseSize mt-[28px] min-w-[223px] border-2"
            onClick={() => handleGotoStep(questions.length)}
          >
            Go to Review Page
          </Button>
        )}
      </div>
    </div>
  );
};
export default QuestionsReviewCard;
