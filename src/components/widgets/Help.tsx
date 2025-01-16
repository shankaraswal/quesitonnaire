import { useState } from 'react';
import { BsList } from 'react-icons/bs';
import { FaCalculator, FaHighlighter, FaMinus, FaPlus } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

const Help = ({
  openMoreModal,
  setOpenMoreModal,
}: {
  openMoreModal: boolean;
  setOpenMoreModal: (show: boolean) => void;
}) => {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const accordionData = [
    {
      title: 'Zoom and Magnification',
      content: (
        <div className="w-full">
          <h4 className="font-bold w-full mb-2">
            Chromebook Zoom and Magnification
          </h4>
          <p>
            To zoom in/out, press <kbd>Control</kbd> + <kbd>+/−</kbd>. To reset
            zoom, press <kbd>Control</kbd> + <kbd>0</kbd>.
          </p>
          <p>For touchscreen and touchpad, pinch in/out.</p>
          <p>
            To use the magnification feature, select the options from the
            floating accessibility menu:
          </p>
          <ul className="list-disc pl-6">
            <li>
              Full-screen magnifier (<kbd>Search</kbd> + <kbd>Ctrl</kbd> +{' '}
              <kbd>M</kbd>) - whole-screen magnification
              <ul className="list-disc pl-6">
                <li>
                  Adjust the full-screen magnifier from the floating
                  Accessibility menu:
                  <ul className="list-disc pl-6">
                    <li>Move screen continuously as mouse moves</li>
                    <li>Move screen keeping mouse at center of screen</li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: 'In-App Calculator',
      content: (
        <div className="w-full">
          <h5 className="font-bold flex items-center mb-2">
            <FaCalculator className="mr-2" /> Calculator
          </h5>
          <p>
            On math questions, you will have access to a graphing calculator
            built into the app. You can also use your own approved calculator.
          </p>
        </div>
      ),
    },
    {
      title: 'Testing Timers',
      content: (
        <p>
          During testing, a timer will let you know how much time remains for
          each module or part of the test. At the end of section 1, you'll have
          a short break. During the break, we'll show you a timer counting down
          to the beginning of section 2. When time runs out on section 2, the
          test will end, and your answers will be automatically submitted.
        </p>
      ),
    },
    {
      title: 'Highlights & Notes',
      content: (
        <div className="w-full">
          <h5 className="font-bold flex items-center mb-2">
            <FaHighlighter className="mr-2" /> Highlights & Notes
          </h5>
          <p>
            On all non-math questions, you can highlight text and leave yourself
            notes.
          </p>
          <ul className="list-disc pl-6">
            <li>
              Click on <strong>Highlights & Notes</strong> from the top right.
            </li>
            <li>Select some text to highlight.</li>
            <li>
              Change the highlight color, add an underline, make a note, or
              delete the highlight.
            </li>
          </ul>
          <p>
            Your annotations will not be graded and are visible on all shared
            content questions.
          </p>
        </div>
      ),
    },
    {
      title: 'Line Reader',
      content: (
        <div className="w-full">
          <h5 className="font-bold flex items-center mb-2">
            <BsList className="mr-2" /> Line Reader
          </h5>
          <p>
            This tool helps you focus as you're reading test content. Use the
            arrows to move the line reader or touch to adjust.
          </p>
        </div>
      ),
    },
  ];

  const toggleItem = (index: number) => {
    setExpandedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const expandAll = () => {
    setExpandedItems(accordionData.map((_, index) => index));
  };

  const collapseAll = () => {
    setExpandedItems([]);
  };

  return (
    <div
      className="fixed inset-0 z-40 bg-black bg-opacity-50"
      onClick={() => setOpenMoreModal(false)}
    >
      {openMoreModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="bg-white w-[770px] rounded-lg shadow-lg p-6 relative text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-h1 mb-4">Help</h2>
            <button
              onClick={() => setOpenMoreModal(false)}
              className="text-gray-500 hover:text-gray-700 absolute top-6 right-6"
            >
              <IoClose className="h-6 w-6" />
            </button>
            <div className="flex justify-end space-x-4 mb-4">
              <button
                onClick={expandAll}
                className="text-blue-500 hover:underline"
              >
                Expand All
              </button>
              <button
                onClick={collapseAll}
                className="text-blue-500 hover:underline"
              >
                Collapse All
              </button>
            </div>
            {accordionData.map((item, index) => (
              <div
                key={index}
                className="border rounded-[8px] overflow-hidden mb-2"
              >
                <div
                  className="bg-gray-100 flex justify-between w-full items-center px-4 py-2 cursor-pointer"
                  onClick={() => toggleItem(index)}
                >
                  <span className="font-semibold">{item.title}</span>
                  <span className="text-gray-500">
                    {expandedItems.includes(index) ? <FaMinus /> : <FaPlus />}
                  </span>
                </div>
                <div
                  className={`transition-all duration-700 overflow-hidden ${
                    expandedItems.includes(index)
                      ? 'max-h-[500px] opacity-100'
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-4 bg-white">{item.content}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Help;
