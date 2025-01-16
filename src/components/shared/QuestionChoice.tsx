import { twMerge } from 'tailwind-merge';

const QuestionChoice = ({
  item,
  selectedAnswer,
  onOptionSelect,
  disabledOptions,
  onCheckboxChange,
  isCheckboxVisible,
  isFreeText,
}: {
  item: {
    id: number;
    question_id: number;
    text: string;
    order: number;
  };
  selectedAnswer: number | undefined;
  onOptionSelect: (optionId: string) => void;
  disabledOptions: Record<string, boolean>;
  onCheckboxChange: (optionId: string) => void;
  isCheckboxVisible: boolean;
  isFreeText: boolean; // New prop to determine input type
}) => {
  return (
    <div className="align-items-center flex" key={item.id}>
      {isFreeText ? (
        <label className="relative flex flex-col gap-2">
          <span className="text-baseSize text-sherpalNeutralTextColor">
            Please provide your answer:
          </span>
          <input
            type="text"
            className="rounded border border-sherpalPrimaryBordergColor p-2"
            placeholder="Enter your response"
            onChange={(e) =>
              onOptionSelect(
                JSON.stringify({ id: item.id, text: e.target.value })
              )
            }
          />
        </label>
      ) : (
        <label
          className={twMerge(
            'relative flex min-h-[64px] flex-row justify-start gap-[10px] rounded-[8px] border p-[15px]',
            selectedAnswer === item.id
              ? '!border-sherpalAccentBordergColor'
              : 'border-sherpalPrimaryBordergColor',
            disabledOptions[item.id] && isCheckboxVisible
              ? 'disabled cursor-not-allowed'
              : 'hover:bg-sherpalLight cursor-pointer',
            isCheckboxVisible ? 'col-11' : 'col-12'
          )}
          htmlFor={String(item.id)}
        >
          <input
            value={String(item.id)}
            readOnly
            hidden
            checked={selectedAnswer === item.id}
            onChange={() =>
              (!disabledOptions[item.id] || !isCheckboxVisible) &&
              onOptionSelect(JSON.stringify(item))
            }
            id={String(item.id)}
            type="radio"
            name={String(item.question_id)}
            className="flex flex-col items-center justify-center rounded-[50%]"
          />
          <span
            className={twMerge(
              'border-sherpalSecondaryBorderColor flex aspect-square h-[34px] w-[34px] flex-col items-center justify-center rounded-[50%] border-2 bg-sherpalNeutralBgColor',
              'text-baseSize font-sherpalReg font-bold uppercase',
              selectedAnswer === item.id
                ? 'border-2 bg-sherpalSecondaryBgColor !text-white'
                : ''
            )}
          >
            {item.order}
          </span>
          <span className="text-baseSize flex flex-col items-center justify-center text-sherpalNeutralTextColor">
            {item.text}
          </span>
          {disabledOptions[item.id] && isCheckboxVisible && (
            <div className="absolute left-[-1.5%] top-1/2 h-[3px] w-[103%] -translate-y-1/2 bg-sherpalSecondaryBgColor" />
          )}
        </label>
      )}
      <div className="col-1 flex justify-end">
        {isCheckboxVisible && (
          <div
            className="float-right cursor-pointer"
            onClick={() => onCheckboxChange(String(item.id))}
          >
            {disabledOptions[item.id] ? (
              <span className="text-tiny font-bold underline">Undo</span>
            ) : (
              <div className="relative mr-1 flex h-[28px] w-[28px] items-center justify-center rounded-full border-2 border-[#626262] bg-transparent">
                <p className="fw-bold font-base relatice uppercase">
                  {item.order}
                </p>
                <span className="absolute h-[2px] w-[150%] bg-sherpalSecondaryBgColor" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionChoice;
