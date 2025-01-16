import { FaRegKeyboard } from 'react-icons/fa';
import { GiHelp } from 'react-icons/gi';
import { IoAccessibilityOutline } from 'react-icons/io5';
import { MdOutlineLineStyle } from 'react-icons/md';
import { TfiSave } from 'react-icons/tfi';

export const testsTypes = [
  { label: 'Practice Test 1', testid: '31799' },
  { label: 'Practice Test 2', testid: '37204' },
  { label: 'Practice Test 3', testid: '911365' },
];

export enum paginationDirection {
  BACK = 'back',
  NEXT = 'next',
  SUBMIT = 'submit',
}

export const quizTimeLimit = 32 * 60;

export type SubmenuType =
  | 'help'
  | 'shortcuts'
  | 'assistive'
  | 'linereader'
  | 'savenexit';

export const menuItems = [
  {
    icon: GiHelp,
    submenu: 'help',
    label: 'Help',
    disabled: false,
    modal: true,
  },
  {
    icon: FaRegKeyboard,
    submenu: 'shortcuts',
    label: 'Keyboard Shortcuts',
    disabled: false,
    modal: true,
  },
  {
    icon: IoAccessibilityOutline,
    submenu: 'assistive',
    label: 'Assistive Technology',
    disabled: true,
    modal: false,
  },
  {
    icon: MdOutlineLineStyle,
    submenu: 'linereader',
    label: 'Line Reader',
    disabled: false,
    modal: false,
  },
  {
    icon: TfiSave,
    submenu: 'savenexit',
    label: 'Save and Exit',
    disabled: false,
    modal: true,
  },
];
