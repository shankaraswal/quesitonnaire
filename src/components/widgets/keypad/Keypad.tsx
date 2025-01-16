import './Keypad.css';

import { useState } from 'react';
import Draggable from 'react-draggable';
import { twMerge } from 'tailwind-merge';

import backSpaceOutLineImg from '../../../assets/icons/backspace-outline.svg';
import closeKeyPad from '../../../assets/icons/close-keypad.svg';
import dragHandler from '../../../assets/icons/drag-handler.svg';

const buttonShadow = {
  boxShadow: `-4px 0px 1.1px 0px #0000001A, 2px -1px 3px 0px #00000017, 5px -3px 3px 0px #0000000D, 9px -4px 4px 0px #00000003, 14px -7px 4px 0px #00000000, 0px 4px 4px 0px #00000040`,
};

interface KeypadProp {
  toggleKeypad: () => void;
  handleKeyEntry: (value: string) => void;
}

const Keypad = ({ toggleKeypad, handleKeyEntry }: KeypadProp) => {
  const [activeDrags, setActiveDrags] = useState(0);
  const handleClick = (value: string) => {
    handleKeyEntry(value);
  };

  const handleClose = () => {
    toggleKeypad();
  };

  const onStart = () => {
    setActiveDrags(activeDrags + 1);
  };

  const onStop = () => {
    setActiveDrags(activeDrags - 1);
  };

  return (
    <Draggable handle="strong" onStart={onStart} onStop={onStop}>
      <div
        className={twMerge(
          'fixed z-[1000] h-[318px] w-[328px] border bg-white shadow-md transition-shadow'
        )}
      >
        <div
          className={twMerge('h-[60px] w-[328px] place-items-center bg-black')}
        >
          <div
            className={twMerge(
              'relative flex w-full items-center justify-between px-[10px] py-[13.5px]'
            )}
          >
            {/* Left-aligned span */}
            <span
              className={twMerge(
                'text-left font-sherpalReg text-h2 font-bold text-white'
              )}
            >
              Keypad
            </span>

            {/* Center-aligned span */}
            <strong
              className={twMerge(
                'drag-handle absolute left-1/2 -translate-x-1/2 text-center text-2xl font-bold text-white'
              )}
            >
              <img
                src={dragHandler}
                className={`h-[15.83px] w-[25.33px] object-contain`}
                alt={':::'}
              />
            </strong>

            {/* Right-aligned span */}
            <span
              onClick={handleClose}
              className={twMerge(
                'text-right font-sherpalReg font-bold text-white hover:text-red-500 focus:outline-none'
              )}
            >
              <img
                src={closeKeyPad}
                className={`h-[28px] w-[28px] object-contain`}
                alt={'←'}
              />
            </span>
          </div>
        </div>

        <div className={twMerge('p-[10px]')}>
          <div className={twMerge('h-[250px] w-[307px] p-[10px]')}>
            <div className={twMerge('flex h-[230px] w-[287px] flex-col gap-0')}>
              <div
                className={twMerge(
                  'grid grid-cols-3 place-items-center gap-x-[10px] gap-y-[18px]'
                )}
              >
                {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(
                  (key, index) => (
                    <button
                      key={index}
                      onClick={() => handleClick(key)}
                      className={twMerge(
                        'flex h-[44px] w-[89px] items-center justify-center font-sherpalReg text-[28px] font-[700]',
                        'rounded-[8px] hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400'
                      )}
                      style={buttonShadow}
                    >
                      {key}
                    </button>
                  )
                )}
              </div>
              <div
                className={twMerge('grid grid-cols-3 gap-x-[10px] pt-[18px]')}
              >
                <div
                  className={twMerge(
                    'grid h-[44px] w-[89px] grid-cols-2 place-items-center gap-x-0'
                  )}
                >
                  {['-', '.'].map((key, index) => (
                    <button
                      key={index}
                      onClick={() => handleClick(key)}
                      className={twMerge(
                        'flex h-[44px] w-[42px] items-center justify-center font-sherpalReg text-[28px] font-[700]',
                        'rounded-[8px] hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400'
                      )}
                      style={buttonShadow}
                    >
                      {key}
                    </button>
                  ))}
                </div>

                <div
                  className={twMerge(
                    'grid h-[44px] w-[89px] grid-cols-1 place-items-center'
                  )}
                >
                  {['0'].map((key, index) => (
                    <button
                      key={index}
                      onClick={() => handleClick(key)}
                      className={twMerge(
                        'flex h-[44px] w-[89px] items-center justify-center font-sherpalReg text-[28px] font-[700]',
                        'rounded-[8px] hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400'
                      )}
                      style={buttonShadow}
                    >
                      {key}
                    </button>
                  ))}
                </div>

                <div
                  className={twMerge(
                    'grid h-[44px] w-[89px] grid-cols-2 place-items-center'
                  )}
                >
                  {['/', 'backspace'].map((key, index) => (
                    <button
                      key={index}
                      onClick={() => handleClick(key)}
                      className={twMerge(
                        'flex h-[44px] w-[42px] items-center justify-center font-sherpalReg text-[28px] font-[700]',
                        'rounded-[8px] hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400'
                      )}
                      style={buttonShadow}
                    >
                      {key !== 'backspace' ? (
                        key
                      ) : (
                        <img
                          src={backSpaceOutLineImg}
                          className={`h-[24px] w-[24px] object-contain`}
                          alt={'backspace'}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default Keypad;
