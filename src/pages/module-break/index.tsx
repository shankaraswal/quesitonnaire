import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ModuleBreakPage = (): JSX.Element => {
  const navigate = useNavigate();

  const [remainingTimeInSeconds, setRemainingTimeInSeconds] = useState<number>(
    10 * 60
  );

  useEffect(() => {
    const timerId = setInterval(() => {
      setRemainingTimeInSeconds((prevTime) =>
        prevTime > 0 ? prevTime - 1 : 0
      );
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <div className="bg-sherpalSecondaryBgColor text-white w-full px-4">
      <div className=" max-w-[1366px] full-screen mx-auto  grid grid-cols-[1fr_auto] gap-x-20 text-left  justify-center items-center">
        <div className="text-center min-w-[460px]">
          <div className="border-2 border-white rounded-lg pt-8 bg-shearpalSecondaryBgColor">
            <h2 className="text-[28px]">Remaining Break Time:</h2>
            <p className="text-[122px]">{formatTime(remainingTimeInSeconds)}</p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="align-self-end text-h3 mt-10 px-6 py-3 rounded-[120px] border-2 border-white bg-[#E8B700] text-center text-black font-semibold font-sherpalReg  hover:bg-[#e4be36]"
          >
            Resume Testing
          </button>
        </div>
        <div className="text-left">
          <h2 className="text-[38px]">Practice Test Break</h2>
          <p className="mt-4 text-white text-h2 leading-[44px]">
            You can resume this practice test as soon as you're ready to move
            on. On test day, you'll wait until the clock counts down. Read below
            to see how breaks work on test day.
          </p>
          <div className="!bg-white h-[2px] my-10 w-full" />
          <h2 className="text-[38px]">
            Take a Break: Do Not Close Your Device
          </h2>
          <p className="mt-4 text-white text-h2 leading-[44px]">
            After the break, a Resume Testing Now button will appear and you'll
            start the next session.
          </p>
          <ul className="mt-4 text-white text-h2 leading-[44px] list-decimal list-inside">
            <li>Do not disturb students who are still testing.</li>
            <li>Do not exit the app or close your laptop.</li>
            <li>
              Do not access phones, smartwatches, textbooks, notes or the
              internet.
            </li>
            <li>Do not eat or drink near any testing device.</li>
            <li>
              Do not speak in the test room; outside the test room, do not
              discuss the exam with anyone.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ModuleBreakPage;
