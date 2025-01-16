import React, { useEffect, useRef, useState } from 'react';
import { FaCalculator, FaCompress, FaExpand, FaTimes } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';

declare global {
  interface Window {
    Desmos: {
      GraphingCalculator: (
        element: HTMLElement,
        options?: Record<string, unknown>
      ) => {
        destroy: () => void;
        setExpression: (expression: { id: string; latex: string }) => void;
      };
    };
  }
}

const DesmosCalculator: React.FC = () => {
  const calculatorContainerRef = useRef<HTMLDivElement | null>(null);
  const calculatorInstanceRef = useRef<ReturnType<
    typeof window.Desmos.GraphingCalculator
  > | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const toggleCalculator = () => {
    setIsVisible((prev) => !prev);
  };

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const closeCalculator = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    if (isVisible) {
      const scriptId = 'desmos-script';
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.src =
          'https://www.desmos.com/api/v1.10/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6';
        script.async = true;
        script.onload = () => {
          if (calculatorContainerRef.current && window.Desmos) {
            calculatorInstanceRef.current = window.Desmos.GraphingCalculator(
              calculatorContainerRef.current,
              {
                expressions: true,
                settingsMenu: true,
                keypad: true,
              }
            );
            calculatorInstanceRef.current.setExpression({
              id: 'sherpal_graph',
              latex: 'y = x^2',
            });
          }
        };
        script.onerror = () => {
          console.error('Failed to load Desmos script.');
        };
        document.body.appendChild(script);
      } else {
        if (calculatorContainerRef.current && window.Desmos) {
          calculatorInstanceRef.current = window.Desmos.GraphingCalculator(
            calculatorContainerRef.current,
            {
              expressions: true,
              settingsMenu: true,
              keypad: true,
            }
          );
          calculatorInstanceRef.current.setExpression({
            id: 'sherpal_graph',
            latex: 'y = x^2',
          });
        }
      }
    }

    return () => {
      if (calculatorInstanceRef.current) {
        calculatorInstanceRef.current.destroy();
      }
    };
  }, [isVisible]);

  return (
    <>
      <button
        className="text-smallSize flex cursor-pointer flex-col justify-center border-b-2 border-transparent p-2 font-semibold text-sherpalSecondaryTextColor hover:border-sherpalAccentBordergColor"
        onClick={toggleCalculator}
      >
        <FaCalculator className="mx-auto mb-2" size={20} />
        <span>Calculator</span>
      </button>
      {isVisible && (
        <div
          className={twMerge(
            'border-sherpalSecondaryBorderColor shadow-custom1 fixed left-[70px] top-[102px] z-[1000] flex flex-col rounded-[10px] border-2 bg-white',
            'transition-all duration-300 ease-in-out',
            isExpanded ? 'h-[calc(100vh-250px)] w-[45%]' : 'h-[400px] w-[600px]'
          )}
        >
          <div className="flex h-[50px] items-center justify-between bg-sherpalSecondaryBgColor p-6 text-white">
            <span className="text-h2 font-semibold">Desmos Calculator</span>
            <div className="flex gap-4">
              <button
                onClick={toggleExpand}
                className="text-baseSize cursor-pointer border-none bg-none text-white"
              >
                {isExpanded ? <FaCompress /> : <FaExpand />}
              </button>
              <button
                className="text-baseSize cursor-pointer border-none text-white"
                onClick={closeCalculator}
              >
                <FaTimes />
              </button>
            </div>
          </div>
          <div
            ref={calculatorContainerRef}
            className={twMerge('h-full flex-grow !rounded-[10px]')}
          />
        </div>
      )}
    </>
  );
};

export default DesmosCalculator;
