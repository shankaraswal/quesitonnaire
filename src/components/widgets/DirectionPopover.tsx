import { useEffect, useRef, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { useLocation } from 'react-router';
import { twMerge } from 'tailwind-merge';

const DirectionPopover = () => {
  const location = useLocation();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (location.pathname === '/questionnaire') {
      setIsPopoverOpen(true);
    }
  }, [location]);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(event.target as Node)
    ) {
      setIsPopoverOpen(false);
    }
  };

  const togglePopover = () => {
    setIsPopoverOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isPopoverOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPopoverOpen]);

  return (
    <>
      {isPopoverOpen && (
        <div
          className="full-screen fixed inset-0 z-20 bg-black bg-opacity-50"
          onClick={() => setIsPopoverOpen(false)}
        ></div>
      )}
      <div className="relative mt-2">
        <button
          onClick={togglePopover}
          className="hover:border-sherpalBorderDefault flex cursor-pointer flex-row items-center justify-center gap-2 border-b-2 border-transparent p-2 px-0 py-1"
        >
          <span className="text-smallSize text-sherpalSecondaryTextColor">
            Directions
          </span>
          <IoIosArrowDown className="mt-1 text-sherpalSecondaryTextColor" />
        </button>
        <div
          ref={popoverRef}
          className={twMerge(
            'border-sherpalBorderDefault text-sherpalBaseText absolute z-50 mt-6 flex h-[550px] w-[770px] flex-col rounded-none border bg-white text-left font-normal shadow-xl',

            'transition-transform duration-500 ease-in-out',
            isPopoverOpen ? '!z-[9999] opacity-100' : '-z-50 hidden opacity-0'
          )}
        >
          <span className="absolute left-0 top-0 -mt-8 ml-10 p-2">
            <svg
              width="60"
              height="30"
              viewBox="0 0 20 10"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 10 L10 0 L20 10 Z" fill="white" />
            </svg>
          </span>
          <div className="flex flex-col gap-4 px-[30px] py-[38px]">
            <div className="h-[420px] min-h-[420px] flex-1 !overflow-y-auto">
              <div className="text-sherpalPrimaryTextColor">
                <p>
                  The questions in this section address a number of important
                  reading and writing skills. Each question includes one or more
                  passages, which may include a table or graph. Read each
                  passage and question carefully, and then choose the best
                  answer to the question based on the passage(s).
                  <br /> All questions in this section are multiple-choice with
                  four answer choices. Each question has a single best answer.
                </p>
              </div>
            </div>

            <button
              onClick={togglePopover}
              className="align-self-end text-smallSize h-[41px] w-[98px] rounded-[120px] border-2 border-black bg-[#E8B700] text-center font-sherpalReg font-bold hover:bg-[#e4be36]"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DirectionPopover;
