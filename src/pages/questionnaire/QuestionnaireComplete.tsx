import { CirclesLoader } from 'src/components';
import { twJoin } from 'tailwind-merge';

const QuestionnaireComplete = () => {
  return (
    <section className="full-screen flex flex-col justify-center">
      <h1 className="text-largeSize text-center">The Module is Over.</h1>
      <div
        className={twJoin(
          'relative mx-auto mt-10 flex w-[510px] flex-col items-center justify-center text-center text-h2 leading-relaxed'
        )}
      >
        All your work has been saved. You'll move on automatically in just a
        moment. Do not refresh this page or quit the app.
        <div className="m-16">
          <CirclesLoader />
        </div>
      </div>
    </section>
  );
};

export default QuestionnaireComplete;
