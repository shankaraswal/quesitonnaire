import { useEffect, useState } from 'react';
import { IoBookmark, IoBookmarkOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';

import { updateAnswer } from '../../features/questionnaire/questionnaireSlice';
import { RootState } from '../../store';

function QuestionMarkReview({
  qid,
  isCheckboxVisible,
  handleToggleCheckboxVisibility,
  qtype,
}: {
  qid: number | undefined;
  isCheckboxVisible: boolean;
  handleToggleCheckboxVisibility: () => void;
  qtype: string;
}) {
  const dispatch = useDispatch();
  const { currentStep, answers } = useSelector(
    (state: RootState) => state.questionnaireState
  );

  const isInitiallyMarked =
    answers.find((ans) => ans.questionId === qid)?.isMarked || false;

  const [isMarked, setIsMarked] = useState(isInitiallyMarked);

  useEffect(() => {
    setIsMarked(isInitiallyMarked);
  }, [qid, isInitiallyMarked]);

  const handleToggleMark = () => {
    const newMarkedState = !isMarked;
    setIsMarked(newMarkedState);

    if (qid !== undefined) {
      dispatch(
        updateAnswer({
          questionId: qid,
          isMarked: newMarkedState,
        })
      );
    }
  };

  return (
    <>
      <div className="justify-content-between flex w-full flex-row gap-2">
        <div className="flex flex-grow flex-row items-center justify-between bg-sherpalAccentBgColor">
          <div className="flex flex-grow flex-row items-center gap-2">
            <span className="flex h-[40px] min-w-[34px] items-center justify-center bg-sherpalSecondaryBgColor px-2 text-[28px] text-white">
              {currentStep + 1}
            </span>
            <button
              onClick={handleToggleMark}
              className="flex cursor-pointer items-center gap-2"
            >
              {isMarked ? (
                <div className="animate-fadeIn flex items-center gap-2">
                  <IoBookmark className="h-[24px] w-[20px] text-[#C43E36]" />
                  <span>Unmark</span>
                </div>
              ) : (
                <div className="animate-fadeOut flex items-center gap-2">
                  <IoBookmarkOutline className="h-[24px] w-[20px] text-[#626262]" />
                  <span className="text-smallSize">Mark For Review</span>
                </div>
              )}
            </button>
          </div>
          {qtype === 'multiple_choice' && (
            <span
              onClick={handleToggleCheckboxVisibility}
              className="mr-3 cursor-pointer"
            >
              <button
                className={twMerge(
                  'relative my-1 flex h-[34px] w-[37px] cursor-pointer items-center justify-center overflow-hidden rounded-[4px] border-2 border-black bg-white font-sans',
                  isCheckboxVisible ? 'bg-sherpalSecondaryBgColor' : ''
                )}
              >
                <span
                  className={twMerge(
                    'text-smallSize z-[1] font-bold',
                    isCheckboxVisible ? 'text-white' : 'text-dark'
                  )}
                >
                  ABC
                </span>
                <span
                  className={twMerge(
                    'line absolute z-[2] h-[2px] w-[120%] rotate-[-40deg] bg-black',
                    isCheckboxVisible ? 'bg-white' : 'bg-black'
                  )}
                ></span>
              </button>
            </span>
          )}
        </div>
      </div>
      <div className="relative mt-2.5 bg-white">
        <div className="absolute bottom-0 left-0 h-[4px] w-full bg-[repeating-linear-gradient(90deg,#333_0,#333_20px,transparent_20px,transparent_25px)]" />
      </div>
    </>
  );
}

export default QuestionMarkReview;
