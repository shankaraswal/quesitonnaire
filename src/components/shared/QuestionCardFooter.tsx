import { useState } from 'react';
import { FC } from 'react';
import { IoIosArrowUp } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';

import { paginationDirection } from '../../constants';
import type { RootState } from '../../store';
import { Button } from '..';
import ContextCard from './QuestionContextCard';

interface QuestionCardFooterProps {
  onPeginate?: (direction: keyof typeof paginationDirection) => void;
  onHandleSubmit?: () => void;
  reviewpage: boolean;
}

const QuestionCardFooter: FC<QuestionCardFooterProps> = ({
  onPeginate,
  onHandleSubmit,
  reviewpage = false,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const {
    currentStep,
    data: { questions = [] } = {},
    metadata: questionnaireMetadata,
  } = useSelector((state: RootState) => state.questionnaireState);

  return (
    <div className="fixed bottom-0 h-[98px] w-full content-center justify-end bg-sherpalPrimaryBgColor px-16 py-3 text-right">
      <div
        className={twMerge(
          'max-[70px] grid w-full content-center justify-around',
          currentStep < questions.length ? '!grid-cols-3' : 'grid-cols-2'
        )}
      >
        <div className="flex h-full content-center items-center text-left font-sherpalReg text-h2 font-semibold text-sherpalSecondaryTextColor">
          {questionnaireMetadata.user_name}
        </div>
        {currentStep < questions.length && (
          <div className="flex flex-col content-center items-center justify-center">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-[48px] min-w-[222px] items-center justify-center rounded-lg bg-[#f8f8ff] px-4 font-semibold text-sherpalPrimaryTextColor"
            >
              Question {currentStep + 1} of {questions.length}
              <IoIosArrowUp className="ml-1 h-4 w-4" />
            </button>
            {isOpen && (
              <ContextCard
                setIsOpen={setIsOpen}
                isOpen={isOpen}
                reviewpage={reviewpage}
              />
            )}
          </div>
        )}
        <div className="flex content-center items-center justify-end gap-4">
          {currentStep !== 0 && (
            <Button onClick={() => onPeginate && onPeginate('BACK')}>
              {paginationDirection.BACK}
            </Button>
          )}
          {reviewpage ? (
            <Button variant="light" onClick={onHandleSubmit}>
              {paginationDirection.SUBMIT}
            </Button>
          ) : (
            <Button onClick={() => onPeginate && onPeginate('NEXT')}>
              {paginationDirection.NEXT}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionCardFooter;
