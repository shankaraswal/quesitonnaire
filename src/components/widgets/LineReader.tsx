import { useState } from 'react';
import Draggable from 'react-draggable';
import { BiSolidDownArrow, BiSolidUpArrow } from 'react-icons/bi';
import { PiDotsSixBold } from 'react-icons/pi';
import { RiCollapseDiagonalFill, RiExpandDiagonalFill } from 'react-icons/ri';

interface LineReaderProps {
  isOpen: boolean;
  onClose: () => void;
}

const maxLines = 5;
const lineHeight = 10;

const LineReader = ({ isOpen, onClose }: LineReaderProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [lineCount, setLineCount] = useState<number>(1);
  const [lineIncreasing, setLineIncreasing] = useState<boolean>(true);

  // Dynamic heights
  const middleSectionHeight = lineCount * lineHeight;
  const remainingHeight = 100 - middleSectionHeight;
  const bottomHeight = remainingHeight - 40;

  const toggleExpand = () => {
    setIsExpanded((prevState) => !prevState);
  };

  const increaseHeight = () => {
    setLineCount((prev) => {
      const newLineCount = Math.min(prev + 1, maxLines);
      if (newLineCount === maxLines) {
        setLineIncreasing(false);
      }
      return newLineCount;
    });
  };

  // Handle decreasing the height
  const decreaseHeight = () => {
    setLineCount((prev) => {
      const newLineCount = Math.max(prev - 1, 1);
      if (newLineCount === 1) {
        setLineIncreasing(true);
      }
      return newLineCount;
    });
  };

  if (!isOpen) return null;

  return (
    <div className="pointer-events-none fixed left-0 top-[98px] z-50 h-full w-full">
      <Draggable handle=".m-header">
        <div
          className={`pointer-events-auto relative left-0 top-[30px] flex w-full flex-col bg-transparent ${
            isExpanded
              ? '!h-[300px] !w-full !max-w-full'
              : '!h-[300px] !w-1/2 !max-w-[50%]'
          }`}
        >
          {/* Top Blurred Section */}
          <div className="relative h-[40%] w-full bg-black/[0.84] backdrop-blur-md">
            <div className="m-header relative flex h-[50%] cursor-grab items-center justify-end bg-black/[0.47]">
              {/* Centered Drag Handle */}
              <div className="six-dots absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-grab">
                <PiDotsSixBold color="white" size={40} />
              </div>

              {/* Right-Aligned Buttons */}
              <div className="ml-auto mr-4 flex items-center space-x-2">
                {/* Expand/Collapse Button */}
                <button
                  className="btn btn-sm btn-outline-light hover:bg-black"
                  onClick={toggleExpand}
                >
                  {isExpanded ? (
                    <RiCollapseDiagonalFill size={25} className="text-white" />
                  ) : (
                    <RiExpandDiagonalFill size={25} className="text-white" />
                  )}
                </button>

                {/* Close Button */}
                <button
                  className="btn-close btn-close-white"
                  onClick={onClose}
                  aria-label="Close"
                />
              </div>
            </div>
          </div>

          {/* Middle Transparent Section */}
          <div
            className="w-full border-x-[20px] border-black/[0.84] bg-transparent"
            style={{
              height: `${middleSectionHeight}%`, // Dynamic height
            }}
          ></div>

          {/* Bottom Blurred Section */}
          <div
            className="d-flex align-items-center w-full justify-center bg-black/[0.84] backdrop-blur-md"
            style={{
              height: `${bottomHeight}%`,
            }}
          >
            <button
              className="h-full"
              onClick={lineIncreasing ? increaseHeight : decreaseHeight}
            >
              {!lineIncreasing ? (
                <BiSolidUpArrow color="#898989" size={25} />
              ) : (
                <BiSolidDownArrow color="#898989" size={25} />
              )}
            </button>
          </div>
        </div>
      </Draggable>
    </div>
  );
};

export default LineReader;
