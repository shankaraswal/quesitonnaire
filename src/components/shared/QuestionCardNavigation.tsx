/* eslint-disable */

import React, { useEffect, useRef, useState } from 'react';
import type { IconType } from 'react-icons';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';
import { twMerge } from 'tailwind-merge';

import { menuItems, SubmenuType } from '../../constants';
import ThemeToggle from '../common/ThemeToggleButton';
import DesmosCalculator from '../widgets/DesmosCalculator';
import LineReader from '../widgets/LineReader';
import MoreDrillDown from '../widgets/MoreDrillDown';
import HighlightAndNotes from '../widgets/HighlightAndNotes';

type MenuItemProps = {
  icon?: IconType;
  submenu: SubmenuType;
  label?: string;
  disabled?: boolean;
  modal: boolean;
};

function QuestionCardNavigation() {
  const dropdownRef = useRef(null);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
  const [openMoreModal, setOpenMoreModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '' });
  const [openLineReader, SetOpenLineReader] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsMoreDropdownOpen((prev) => !prev);
  };

  const handleShowModal = (show: boolean, title?: string) => {
    if (title) {
      setModalContent({ title });
    }
    setOpenMoreModal(show);
    setIsMoreDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setIsMoreDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMenuAction = (item: MenuItemProps) => {
    setIsMoreDropdownOpen(false);
    switch (item.submenu) {
      case 'linereader':
        SetOpenLineReader(true);
        break;
      default:
        handleShowModal(item.modal, item.submenu);
    }
  };

  return (
    <>
      <div className="flex flex-row justify-end gap-6">
        <ThemeToggle />
        <DesmosCalculator />
        <HighlightAndNotes />

        <span className="relative inline-block text-left" ref={dropdownRef}>
          <button
            className="text-smallSize flex cursor-pointer flex-col justify-center border-b-2 border-transparent p-2 font-semibold text-sherpalSecondaryTextColor hover:border-sherpalAccentBordergColor"
            onClick={toggleDropdown}
          >
            <BsThreeDotsVertical size={20} className="mx-auto mb-2" />
            <span>More</span>
          </button>
          {isMoreDropdownOpen && (
            <div className="shadow-custom-reg absolute right-0 z-10 mt-2 flex w-fit origin-top-right flex-col rounded-[8px] border border-gray-200 bg-white">
              <div className="relative py-2">
                <IoClose
                  className="text-sherpalReg absolute right-5 top-5 cursor-pointer font-bold hover:scale-150"
                  onClick={() => setIsMoreDropdownOpen(false)}
                />
                {menuItems.map((item) => (
                  <button
                    key={item.label}
                    className={twMerge(
                      'text-sherpalReg flex flex-row gap-[15px] whitespace-nowrap',
                      'h-[80px] w-full items-center px-[30px] text-left font-sherpalReg text-h2 hover:underline',
                      item.disabled &&
                        'cursor-not-allowed opacity-50 hover:no-underline'
                    )}
                    disabled={item.disabled}
                    onClick={() => handleMenuAction(item as MenuItemProps)}
                  >
                    {item.icon && React.createElement(item.icon)}
                    <span className="ml-2">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </span>
      </div>
      <LineReader
        isOpen={openLineReader}
        onClose={() => SetOpenLineReader(false)}
      ></LineReader>
      <MoreDrillDown
        openMoreModal={openMoreModal}
        setOpenMoreModal={setOpenMoreModal}
        modalContent={modalContent}
      />
    </>
  );
}

export default QuestionCardNavigation;
