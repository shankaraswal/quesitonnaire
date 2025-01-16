import React, { useEffect, useState } from 'react';
import { LuPencilLine } from 'react-icons/lu';
import { twMerge } from 'tailwind-merge';

const HighlightAndNotes: React.FC = () => {
  const [isHighlightModeOn, setIsHighlightModeOn] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isColorBoxVisible, setIsColorBoxVisible] = useState(false);
  const [colorBoxPosition, setColorBoxPosition] = useState({ top: 0, left: 0 });
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0); // Default to the first color
  const highlightColors = ['#FFFAD7', '#E7F6FF', '#FFE5F9']; // Color options
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isBoxVisible, setIsBoxVisible] = useState(false);

  // Function to handle SVG icon click
  const handleIconClick = () => {
    setIsDropdownVisible(!isDropdownVisible); // Toggle dropdown visibility
  };

  // Function to handle dropdown option selection
  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setIsDropdownVisible(false); // Close dropdown after selection
  };

  const handleMouseUp = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0 && isHighlightModeOn) {
      const range = selection.getRangeAt(0);
      if (range && selection.toString().trim() !== '') {
        const rect = range.getBoundingClientRect(); // Get bounding box of the selected text
        const parentElement = document.querySelector('#highlight-container');

        if (parentElement) {
          const parentRect = parentElement.getBoundingClientRect();
          setColorBoxPosition({
            top: rect.bottom - parentRect.top,
            left: rect.left - parentRect.left,
          });
          setIsColorBoxVisible(true);
        }
      }
    } else {
      setIsColorBoxVisible(false);
    }
  };

  const applyHighlightColor = (color: string) => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      if (!range.collapsed) {
        const span = document.createElement('span');
        span.style.backgroundColor = color; // Apply selected color
        span.textContent = range.toString(); // Add selected text
        range.deleteContents(); // Clear the current selection
        range.insertNode(span); // Insert the colored span
        setIsColorBoxVisible(false); // Hide color box
      }
    }
  };

  useEffect(() => {
    if (isHighlightModeOn) {
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isHighlightModeOn]);

  return (
    <div className="relative content-center flex">
      <button
        className={twMerge(
          'text-smallSize flex cursor-pointer flex-col justify-center border-b-2 border-transparent p-2 font-semibold text-sherpalSecondaryTextColor hover:border-sherpalAccentBordergColor'
          // isHighlightModeOn ? 'bg-white rounded-md' : ''
        )}
        onClick={() => {
          setIsHighlightModeOn(!isHighlightModeOn);
          setIsPopupVisible(!isPopupVisible);
        }}
      >
        <LuPencilLine size={20} className="mx-auto mb-2" />
        Highlight & Notes
      </button>
      {/* Highlight and Note Button */}
      <div className="absolute">
        {/* Popup Box */}
        {isPopupVisible && (
          <div className="absolute top-20 left-[-50px] right-0 mx-auto p-[10px] px-[20px] rounded-[10px] bg-[#333333] border border-gray-300 shadow-custom w-[250px] text-center z-[1000]">
            <div className="absolute -top-[10px] left-1/2 -translate-x-1/2 text-[#333333] w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-[#333333]" />
            <p className="text-white p-1">
              Highlight mode on:{' '}
              <span>Select text to create a highlight automatically</span>
            </p>
          </div>
        )}
      </div>

      {/* Text Container */}
      <div
        id="highlight-container"
        style={{
          userSelect: isHighlightModeOn ? 'text' : 'none',
          overflow: 'auto',
          marginTop: '20px',
        }}
      ></div>

      <style>
        {isHighlightModeOn &&
          `
          ::selection {
            background-color: #FFD700; /* Yellow highlight */
            color: black;
          }
        `}
      </style>

      {/* Color Picker Box */}
      {isColorBoxVisible && (
        <div
          id="highlight-container"
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            margin: '50px -80px',
            justifyContent: 'space-between',
            padding: '12px 15px',
            position: 'absolute',
            top: `${colorBoxPosition.top}px`,
            left: `${colorBoxPosition.left}px`,
            background: '#FFFFFF',
            boxShadow:
              '0px 11px 4px rgba(0, 0, 0, 0.01), 0px 6px 4px rgba(0, 0, 0, 0.05), 0px 3px 3px rgba(0, 0, 0, 0.09), 0px 1px 1px rgba(0, 0, 0, 0.1)',
            borderRadius: '120px',
            zIndex: 1000,
          }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          {highlightColors.map((color, index) => (
            <div
              key={color}
              onClick={() => {
                document.execCommand('backColor', false, color);
                applyHighlightColor(color);
                setSelectedColorIndex(index); // Track the selected circle index
              }}
              style={{
                margin: '10px',
                width: '40px',
                height: '40px',
                backgroundColor: color,
                borderRadius: '50%',
                position: 'relative',
                cursor: 'pointer',
                border: '1px solid #8E8E8E',
              }}
            >
              {/* SVG appears only in the selected circle */}
              {selectedColorIndex === index && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16px"
                  height="24px"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="black"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    position: 'absolute',
                    width: '28px',
                    height: '28px',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%) rotate(180deg)',
                  }}
                >
                  <path d="M12 2C8 2 6 6 6 9C6 12 12 22 12 22C12 22 18 12 18 9C18 6 16 2 12 2Z" />
                </svg>
              )}
            </div>
          ))}

          <div style={{ position: 'relative', display: 'inline-block' }}>
            {/* SVG Icon Button */}
            <div
              style={{
                margin: '10px',
                width: '40px',
                height: '40px',
                //    backgroundColor: color,
                borderRadius: '50%',
                position: 'relative',
                cursor: 'pointer',
              }}
              onClick={handleIconClick} // Toggle dropdown visibility
            >
              <svg
                width="37"
                height="33"
                viewBox="0 0 37 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.0137 4.35938H15.0762V14.9404C15.0762 16.1149 14.8148 17.0924 14.292 17.873C13.7692 18.6536 13.0745 19.2409 12.208 19.6348C11.3486 20.0215 10.4141 20.2148 9.4043 20.2148C8.3444 20.2148 7.38477 20.0215 6.52539 19.6348C5.67318 19.2409 4.99642 18.6536 4.49512 17.873C4.00098 17.0924 3.75391 16.1149 3.75391 14.9404V4.35938H5.80566V14.9404C5.80566 15.7568 5.95605 16.43 6.25684 16.96C6.55762 17.4899 6.97656 17.8838 7.51367 18.1416C8.05794 18.3994 8.68815 18.5283 9.4043 18.5283C10.1276 18.5283 10.7578 18.3994 11.2949 18.1416C11.8392 17.8838 12.2617 17.4899 12.5625 16.96C12.8633 16.43 13.0137 15.7568 13.0137 14.9404V4.35938Z"
                  fill="black"
                />
                <path d="M1 24H18" stroke="black" strokeLinecap="square" />
                <path
                  d="M1 28H18"
                  stroke="black"
                  strokeLinecap="square"
                  strokeDasharray="4 4"
                />
                <path
                  d="M1 32H18"
                  stroke="black"
                  strokeLinecap="square"
                  strokeDasharray="2 2"
                />
                <g clipPath="url(#clip0_194_13244)">
                  <path
                    d="M30.0318 12.6669L24.6917 18.0071C24.5681 18.1306 24.5 18.2954 24.5 18.4713C24.5 18.6471 24.5681 18.8119 24.6917 18.9354L25.0849 19.3287C25.3411 19.5846 25.7575 19.5846 26.0133 19.3287L30.4975 14.8445L34.9867 19.3337C35.1104 19.4572 35.2751 19.5254 35.4508 19.5254C35.6267 19.5254 35.7915 19.4572 35.9152 19.3337L36.3083 18.9404C36.4319 18.8168 36.5 18.652 36.5 18.4762C36.5 18.3004 36.4319 18.1355 36.3083 18.012L30.9634 12.6669C30.8394 12.5431 30.6738 12.4751 30.4978 12.4755C30.3211 12.4751 30.1557 12.5431 30.0318 12.6669Z"
                    fill="black"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_194_13244">
                    <rect
                      width="12"
                      height="12"
                      fill="white"
                      transform="matrix(0 -1 1 0 24.5 22)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>

            {/* Dropdown Box */}
            {isDropdownVisible && (
              <div
                style={{
                  position: 'absolute',
                  top: '50px', // Position dropdown below the icon
                  left: '0px',
                  background: '#fff',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                  padding: '10px',
                  zIndex: 1000,
                }}
              >
                {/* Options inside the dropdown */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleOptionSelect}
                  >
                    <svg
                      width="19"
                      height="25"
                      viewBox="0 0 19 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.7637 4.35938H14.8262V14.9404C14.8262 16.1149 14.5648 17.0924 14.042 17.873C13.5192 18.6536 12.8245 19.2409 11.958 19.6348C11.0986 20.0215 10.1641 20.2148 9.1543 20.2148C8.0944 20.2148 7.13477 20.0215 6.27539 19.6348C5.42318 19.2409 4.74642 18.6536 4.24512 17.873C3.75098 17.0924 3.50391 16.1149 3.50391 14.9404V4.35938H5.55566V14.9404C5.55566 15.7568 5.70605 16.43 6.00684 16.96C6.30762 17.4899 6.72656 17.8838 7.26367 18.1416C7.80794 18.3994 8.43815 18.5283 9.1543 18.5283C9.8776 18.5283 10.5078 18.3994 11.0449 18.1416C11.5892 17.8838 12.0117 17.4899 12.3125 16.96C12.6133 16.43 12.7637 15.7568 12.7637 14.9404V4.35938Z"
                        fill="black"
                      />
                      <path
                        d="M1 24H18"
                        stroke="black"
                        strokeLinecap="square"
                      />
                    </svg>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleOptionSelect}
                  >
                    <svg
                      width="19"
                      height="25"
                      viewBox="0 0 19 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.7637 4.35938H14.8262V14.9404C14.8262 16.1149 14.5648 17.0924 14.042 17.873C13.5192 18.6536 12.8245 19.2409 11.958 19.6348C11.0986 20.0215 10.1641 20.2148 9.1543 20.2148C8.0944 20.2148 7.13477 20.0215 6.27539 19.6348C5.42318 19.2409 4.74642 18.6536 4.24512 17.873C3.75098 17.0924 3.50391 16.1149 3.50391 14.9404V4.35938H5.55566V14.9404C5.55566 15.7568 5.70605 16.43 6.00684 16.96C6.30762 17.4899 6.72656 17.8838 7.26367 18.1416C7.80794 18.3994 8.43815 18.5283 9.1543 18.5283C9.8776 18.5283 10.5078 18.3994 11.0449 18.1416C11.5892 17.8838 12.0117 17.4899 12.3125 16.96C12.6133 16.43 12.7637 15.7568 12.7637 14.9404V4.35938Z"
                        fill="black"
                      />
                      <path
                        d="M1 24H18"
                        stroke="black"
                        strokeLinecap="square"
                        strokeDasharray="4 4"
                      />
                    </svg>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleOptionSelect}
                  >
                    <svg
                      width="19"
                      height="25"
                      viewBox="0 0 19 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.7637 4.35938H14.8262V14.9404C14.8262 16.1149 14.5648 17.0924 14.042 17.873C13.5192 18.6536 12.8245 19.2409 11.958 19.6348C11.0986 20.0215 10.1641 20.2148 9.1543 20.2148C8.0944 20.2148 7.13477 20.0215 6.27539 19.6348C5.42318 19.2409 4.74642 18.6536 4.24512 17.873C3.75098 17.0924 3.50391 16.1149 3.50391 14.9404V4.35938H5.55566V14.9404C5.55566 15.7568 5.70605 16.43 6.00684 16.96C6.30762 17.4899 6.72656 17.8838 7.26367 18.1416C7.80794 18.3994 8.43815 18.5283 9.1543 18.5283C9.8776 18.5283 10.5078 18.3994 11.0449 18.1416C11.5892 17.8838 12.0117 17.4899 12.3125 16.96C12.6133 16.43 12.7637 15.7568 12.7637 14.9404V4.35938Z"
                        fill="black"
                      />
                      <path
                        d="M1 24H18"
                        stroke="black"
                        strokeLinecap="square"
                        strokeDasharray="2 2"
                      />
                    </svg>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: 'black',
                    }}
                    onClick={() => handleOptionSelect}
                  >
                    None
                  </div>
                </div>
              </div>
            )}

            {/* Show selected option */}
            {selectedOption && <div>Selected: {selectedOption}</div>}
          </div>

          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              //   backgroundColor: "#FFF",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              border: '1px solid #8E8E8E',
              color: '#000',
              margin: '10px',
            }}
            onClick={() => {
              document.execCommand('removeFormat', false);
              setIsColorBoxVisible(false);
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_194_12509)">
                <path
                  d="M22.3329 5.38672L20.5478 25.7291H7.46039L5.67561 5.38672L3.41406 5.58496L5.23144 26.2963C5.32709 27.2509 6.15538 27.9993 7.11761 27.9993H20.8906C21.8524 27.9993 22.6811 27.2513 22.7783 26.2826L24.5945 5.58496L22.3329 5.38672Z"
                  fill="black"
                />
                <path
                  d="M18.1615 0H9.83723C8.79401 0 7.94531 0.848695 7.94531 1.89191V5.48652H10.2156V2.27024H17.7831V5.48647H20.0533V1.89186C20.0535 0.848695 19.2048 0 18.1615 0Z"
                  fill="black"
                />
                <path
                  d="M26.1091 4.35156H1.89296C1.26597 4.35156 0.757812 4.85972 0.757812 5.48671C0.757812 6.1137 1.26597 6.62186 1.89296 6.62186H26.1092C26.7362 6.62186 27.2443 6.1137 27.2443 5.48671C27.2443 4.85972 26.7361 4.35156 26.1091 4.35156Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_194_12509">
                  <rect width="28" height="28" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              border: '1px solid #8E8E8E',
              color: '#000',
              margin: '10px',
            }}
            onClick={() => setIsBoxVisible(!isBoxVisible)} // Toggle visibility of the box
          >
            <svg
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="30" cy="30" r="29.5" fill="white" stroke="#8E8E8E" />
              <path
                d="M43.5794 36.1122L33.7796 42.2371C33.6569 42.323 33.5055 42.391 33.3362 42.4363C33.1669 42.4817 32.9837 42.5033 32.7996 42.4996H18.7999C18.058 42.4982 17.3471 42.3134 16.8225 41.9855C16.2979 41.6576 16.0022 41.2133 16 40.7496V19.75C16.0022 19.2863 16.2979 18.842 16.8225 18.5141C17.3471 18.1862 18.058 18.0014 18.7999 18H41.1994C41.9413 18.0014 42.6522 18.1862 43.1768 18.5141C43.7014 18.842 43.9971 19.2863 43.9994 19.75V35.4997C44.0052 35.6148 43.9707 35.7293 43.8981 35.8351C43.8256 35.9409 43.7168 36.0355 43.5794 36.1122ZM32.7996 40.3996L40.6394 35.4997H32.7996V40.3996ZM41.1994 19.75H18.7999V40.7496H29.9997V35.4997C30.0019 35.036 30.2976 34.5917 30.8222 34.2638C31.3468 33.9359 32.0577 33.7511 32.7996 33.7497H41.1994V19.75Z"
                fill="black"
              />
              <path
                d="M41.1994 19.75H18.7999V40.7496H29.9997V35.4997C30.0019 35.036 30.2976 34.5917 30.8222 34.2638C31.3468 33.9359 32.0577 33.7511 32.7996 33.7497H41.1994V19.75Z"
                fill="#FFFBD8"
              />
              <path
                d="M30.4565 25.4565C30.4565 25.3354 30.4084 25.2193 30.3228 25.1337C30.2372 25.0481 30.1211 25 30 25C29.8789 25 29.7628 25.0481 29.6772 25.1337C29.5916 25.2193 29.5435 25.3354 29.5435 25.4565V28.0435H26.9565C26.8354 28.0435 26.7193 28.0916 26.6337 28.1772C26.5481 28.2628 26.5 28.3789 26.5 28.5C26.5 28.6211 26.5481 28.7372 26.6337 28.8228C26.7193 28.9084 26.8354 28.9565 26.9565 28.9565H29.5435V31.5435C29.5435 31.6646 29.5916 31.7807 29.6772 31.8663C29.7628 31.9519 29.8789 32 30 32C30.1211 32 30.2372 31.9519 30.3228 31.8663C30.4084 31.7807 30.4565 31.6646 30.4565 31.5435V28.9565H33.0435C33.1646 28.9565 33.2807 28.9084 33.3663 28.8228C33.4519 28.7372 33.5 28.6211 33.5 28.5C33.5 28.3789 33.4519 28.2628 33.3663 28.1772C33.2807 28.0916 33.1646 28.0435 33.0435 28.0435H30.4565V25.4565Z"
                fill="black"
              />
            </svg>
          </div>

          {/* Conditional Box */}
        </div>
      )}
    </div>
  );
};

export default HighlightAndNotes;
