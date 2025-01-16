import { twMerge } from 'tailwind-merge';

import keyboardIconBlack from '../../../assets/icons/keyboard-icon-black.svg';
import keyboardIconWhite from '../../../assets/icons/keyboard-icon-white.svg';

const buttonShadow = {
  boxShadow: `-4px 0px 1.1px 0px #0000001A, 2px -1px 3px 0px #00000017, 5px -3px 3px 0px #0000000D, 9px -4px 4px 0px #00000003, 14px -7px 4px 0px #00000000, 0px 4px 4px 0px #00000040`,
};

interface ShowKeypadButtonProp {
  toggleKeypad: () => void;
  btnStatus: boolean;
}

const ShowKeypadButton = ({
  toggleKeypad,
  btnStatus,
}: ShowKeypadButtonProp) => {
  const handleToggle = () => {
    toggleKeypad();
  };

  return (
    <div>
      <button
        onClick={handleToggle}
        className={twMerge(
          'w-[190px]',
          'h-[36px]',
          'px-[30px] py-[6px]',
          'gap-[4px]',
          'rounded-[30px]',
          'flex items-center justify-center',
          btnStatus ? 'bg-black text-white' : 'bg-white text-black'
        )}
        style={buttonShadow}
      >
        <img
          src={btnStatus ? keyboardIconWhite : keyboardIconBlack}
          alt="keyboard"
          className={twMerge('h-[22px] w-[22px]')}
        />
        {btnStatus ? (
          <span className="text-tiny font-medium">Hide Keyboard</span>
        ) : (
          <span className="text-tiny font-medium">Show Keyboard</span>
        )}
      </button>
    </div>
  );
};

export default ShowKeypadButton;
