import { IoClose } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';

import type { RootState } from '../../store';
import QuestionsReviewCard from './QuestionsReviewCard';

const QuestionContextCard = ({
  setIsOpen,
  isOpen,
  reviewpage,
}: {
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
  reviewpage: boolean;
}) => {
  useSelector((state: RootState) => state.questionnaireState);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      <section
        className={twMerge(
          'shadow-10 fixed bottom-[100px] mx-auto w-[710px] rounded-[8px] border-2 border-b-0 border-gray-200 bg-sherpalNeutralBgColor p-10',
          'z-50 transform transition-transform duration-500 ease-in-out',
          'px-[30px]',
          isOpen ? 'translate-y-0' : 'translate-y-[1000px]'
        )}
      >
        <span className="absolute bottom-0 left-[55%] -mb-[30px] p-2">
          <svg
            width="60"
            height="30"
            viewBox="0 0 20 10"
            className="rotate-180"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 10 L10 0 L20 10 Z" fill="white" />
          </svg>
        </span>
        <button
          className="text-largeSize absolute right-6 top-6 text-sherpalNeutralTextColor hover:scale-110"
          onClick={() => setIsOpen(false)}
        >
          <IoClose className="transition-all duration-300 hover:scale-110" />
        </button>
        <QuestionsReviewCard reviewpage={reviewpage} />
      </section>
    </>
  );
};

export default QuestionContextCard;
