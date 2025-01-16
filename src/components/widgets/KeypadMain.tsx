import { useState } from 'react';
import Keypad from 'src/components/widgets/keypad/Keypad';
import ShowKeypadButton from 'src/components/widgets/keypadbtn/ShowKeypadButton';

interface KeypadMain {
  onKeyPress: (value: string) => void;
}

const KeypadMain = ({ onKeyPress }: KeypadMain) => {
  const [show, setShow] = useState(false);

  const toggleKeypad = () => {
    setShow((prev) => !prev);
  };

  const handleKeyEntry = (value: string) => {
    onKeyPress(value);
  };

  return (
    <div>
      <ShowKeypadButton toggleKeypad={toggleKeypad} btnStatus={show} />
      {show && (
        <Keypad toggleKeypad={toggleKeypad} handleKeyEntry={handleKeyEntry} />
      )}
    </div>
  );
};

export default KeypadMain;
