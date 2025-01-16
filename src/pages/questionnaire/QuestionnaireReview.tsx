import { twJoin, twMerge } from 'tailwind-merge';

import QuestionsReviewCard from '../../components/shared/QuestionsReviewCard';

const QuestionnaireReview = ({ reviewpage }: { reviewpage: boolean }) => {
  return (
    <div className="flex min-h-[calc(100vh-248px)] !w-full flex-col content-center items-center justify-center">
      <div
        className={twMerge(
          'mx-auto flex flex-col items-center justify-center p-10',
          reviewpage ? 'w-[890px]' : 'w-[710px]'
        )}
      >
        <div className="w-full">
          <h1 className="text-largeSize mb-[40px] font-sherpalReg">
            Check Your Work
          </h1>
          <p className="px-10 font-sherpalReg text-h2">
            On test day, you won't be able to move on to the next module until
            time expires. For these practice questions, you can click Next when
            you're ready to move on.
          </p>
        </div>
        <section
          className={twJoin(
            'border-sherpalPrimaryBorderColor mx-auto mt-10 min-h-[350px] w-full rounded-[20px] border-2 bg-white p-10',
            'z-0 transform shadow-[0px_0px_30px_10px_#d9d9d9] transition-transform duration-500 ease-in-out'
          )}
        >
          <QuestionsReviewCard reviewpage={reviewpage} />
        </section>
      </div>
    </div>
  );
};
export default QuestionnaireReview;
