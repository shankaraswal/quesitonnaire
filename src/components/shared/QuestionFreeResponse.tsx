import { useState } from 'react';
import KeypadMain from 'src/components/widgets/KeypadMain';

const QuestionFreeResponse = ({
  questionId,
}: {
  questionId: number;
  onOptionSelect?: (option: string) => void;
}) => {
  const [freeText, setFreeText] = useState<{ id: number; text: string } | null>(
    {
      text: '',
      id: questionId,
    }
  );

  const onKeyPress = (value: string) => {
    if (value === 'backspace') {
      setFreeText({
        id: questionId,
        text: freeText?.text ? freeText?.text.replace(/.$/, '') : '',
      });
    } else {
      setFreeText({
        id: questionId,
        text: freeText?.text + value,
      });
    }
  };

  return (
    <div className="align-items-center flex w-full">
      <label className="relative flex w-full flex-col gap-[28px]">
        <div className="border-sherpalSecondaryBorderColor w-fit rounded-[8px] border-2 p-2">
          <input
            type="text"
            className="border-sherpalSecondaryBorderColor mx-2 h-[60px] w-[100px] border-b-2 p-2 !text-h1 tracking-wider focus:outline-none"
            value={freeText?.text}
            onChange={(e) =>
              setFreeText({ id: questionId, text: e.target.value })
            }
          />
        </div>
        <div className="text-sherpalNeutralTextColor text-left text-h3 font-semibold">
          Answer Preview:
          <p className="my-2 font-normal inline-block">{freeText?.text}</p>
        </div>
        <KeypadMain onKeyPress={onKeyPress} />
      </label>
    </div>
  );
};
export default QuestionFreeResponse;
