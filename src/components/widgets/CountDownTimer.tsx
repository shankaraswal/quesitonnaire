import { useEffect, useState } from 'react';
import { RxStopwatch } from 'react-icons/rx';
import { useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';

import { quizTimeLimit } from '../../constants';
import { RootState } from '../../store';
import { Button } from '..';

const CountDownTimer = () => {
  const [timeCounter, setTimeCounter] = useState(0);
  const [hideTimer, setHideTimer] = useState(false);
  const questionnaireResponse = useSelector(
    (state: RootState) => state.questionnaireState.data
  );

  useEffect(() => {
    const timeLimit = questionnaireResponse.quiz_time_limit ?? quizTimeLimit;
    setTimeCounter(Number(timeLimit));
  }, [questionnaireResponse.quiz_time_limit]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeCounter((timeCounter) => {
        if (timeCounter === 0) {
          clearInterval(timer);
          return 0;
        } else return timeCounter - 1;
      });
    }, 1000);
  }, []);

  return (
    <div className="max-w-fit justify-center px-4">
      <div className="mx-auto flex max-w-[100px] flex-col items-center justify-center">
        <div className="flex h-[50px] w-full flex-col justify-center">
          <RxStopwatch
            className={twMerge(
              'fixed-stopwatch-icon w-[100px] text-sherpalSecondaryTextColor',
              !hideTimer ? 'hidden' : 'block'
            )}
            size={22}
          />
          <span
            className={twMerge(
              'fixed-stopwatch-icon w-[100px] text-h1 font-bold !text-sherpalSecondaryTextColor',
              hideTimer ? 'hidden' : 'block'
            )}
          >
            {`${Math.floor(timeCounter / 60)}`.padStart(2, '0')}:
            {`${timeCounter % 60}`.padStart(2, '0')}
          </span>
        </div>
        <Button
          variant="dark"
          onClick={() => setHideTimer(!hideTimer)}
          className="!text-smallSize h-[26px] w-[80px] min-w-[80px] bg-sherpalPrimaryBgColor font-bold"
        >
          {hideTimer ? 'Show' : 'Hide'}
        </Button>
      </div>
    </div>
  );
};
export default CountDownTimer;
