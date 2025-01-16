import { useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

const KeyboardShortcuts = ({
  openMoreModal,
  setOpenMoreModal,
}: {
  openMoreModal: boolean;
  setOpenMoreModal: (show: boolean) => void;
}) => {
  const [expandedSections, setExpandedSections] = useState<number[]>([]);

  const accordionData = [
    {
      title: 'Keyboard Shortcuts: Windows',
      content: (
        <div>
          <p className="text-gray-600">
            The following keyboard shortcuts have been configured to navigate to
            important functions within the digital exam.
          </p>
          <table className="w-full mt-4 border-collapse text-sm">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="border px-4 py-2 text-left">Action</th>
                <th className="border px-4 py-2 text-left">Shortcut</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">
                  Open/Close Keyboard Shortcuts
                </td>
                <td className="border px-4 py-2">F1</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Navigate Exam Regions</td>
                <td className="border px-4 py-2">Shift + F6</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Zoom In</td>
                <td className="border px-4 py-2">Control + Plus (+)</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Zoom Out</td>
                <td className="border px-4 py-2">Control + Minus (-)</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Zoom Back to 100%</td>
                <td className="border px-4 py-2">Control + 0</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Back</td>
                <td className="border px-4 py-2">Control + B</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Next</td>
                <td className="border px-4 py-2">Control + N</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Open/Close Question Menu</td>
                <td className="border px-4 py-2">Control + Alt + Q</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Help</td>
                <td className="border px-4 py-2">Control + Shift + D</td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
    {
      title: 'Keyboard Shortcuts: Free-Response Questions',
      content: (
        <div>
          <p className="text-gray-600">
            Note: For multiselect options, use the space bar to make your
            selection.
          </p>
          <table className="w-full mt-4 border-collapse text-sm">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="border px-4 py-2 text-left">Action</th>
                <th className="border px-4 py-2 text-left">Shortcut</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">Bold</td>
                <td className="border px-4 py-2">Control + B</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Navigate Exam Regions</td>
                <td className="border px-4 py-2">Shift + F6</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Zoom In</td>
                <td className="border px-4 py-2">Control + Plus (+)</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Zoom Out</td>
                <td className="border px-4 py-2">Control + Minus (-)</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Zoom Back to 100%</td>
                <td className="border px-4 py-2">Control + 0</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Back</td>
                <td className="border px-4 py-2">Control + B</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Next</td>
                <td className="border px-4 py-2">Control + N</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Open/Close Question Menu</td>
                <td className="border px-4 py-2">Control + Alt + Q</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Help</td>
                <td className="border px-4 py-2">Control + Shift + D</td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
  ];

  const handleExpandAll = () => {
    setExpandedSections(accordionData.map((_, index) => index));
  };

  const handleCollapseAll = () => {
    setExpandedSections([]);
  };

  const toggleSection = (index: number) => {
    setExpandedSections((prev) =>
      prev.includes(index)
        ? prev.filter((key) => key !== index)
        : [...prev, index]
    );
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
            <h2 className="text-h1 mb-4">Keyboard Shortcuts</h2>
            <button
              onClick={() => setOpenMoreModal(false)}
              className="text-gray-500 hover:text-gray-700 absolute top-6 right-6"
            >
              <IoClose className="h-6 w-6" />
            </button>
            <div className="flex justify-end space-x-4 mb-4">
              <button
                onClick={handleExpandAll}
                className="text-blue-500 hover:underline"
              >
                Expand All
              </button>
              <button
                onClick={handleCollapseAll}
                className="text-blue-500 hover:underline"
              >
                Collapse All
              </button>
            </div>
            {accordionData.map((section, index) => (
              <div
                key={index}
                className="border rounded-lg overflow-hidden mb-4"
              >
                <div
                  className="bg-gray-100 flex justify-between items-center px-4 py-3 cursor-pointer"
                  onClick={() => toggleSection(index)}
                >
                  <span className="font-semibold">{section.title}</span>
                  <span className="text-gray-500">
                    {expandedSections.includes(index) ? (
                      <FaMinus />
                    ) : (
                      <FaPlus />
                    )}
                  </span>
                </div>
                <div
                  className={`transition-all duration-700 overflow-hidden ${
                    expandedSections.includes(index)
                      ? 'max-h-[500px] opacity-100'
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 py-4">{section.content}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default KeyboardShortcuts;
