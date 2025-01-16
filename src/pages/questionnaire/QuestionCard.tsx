import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

import ColResizerIcons from '../../components/common/ColResizerIcons';
import QuestionChoice from '../../components/shared/QuestionChoice';
import QuestionFreeResponse from '../../components/shared/QuestionFreeResponse';
import QuestionMarkReview from '../../components/shared/QuestionMarkReview';
import QuestionText from '../../components/shared/QuestionText';
import type { QuestionCardProps } from '../../features/questionnaire/questionnaire.types';

const QuestionCard = ({
  qdata,
  selectedAnswer,
  onOptionSelect,
  onCheckboxChange,
  disabledOptions,
}: QuestionCardProps) => {
  const [expandLayout, setExpandLayout] = useState({
    left: 'col-6',
    right: 'col-6',
  });

  const handleColResizer = (layout: { left: string; right: string }) => {
    setExpandLayout(layout);
  };

  const [isCheckboxVisible, setIsCheckboxVisible] = useState(false);
  const handleToggleCheckboxVisibility = () => {
    setIsCheckboxVisible(!isCheckboxVisible);
  };

  return (
    <div className="w-full overflow-y-auto px-[70px]">
      <div className="my-[10px] flex h-full w-full flex-row justify-between">
        {/* LEFT COLUMN */}
        <section
          className={twMerge(
            'align-items-start flex-column border-sherpalReg border-r-[5px] pr-[20px]',
            'min-h-[calc(100vh-308px)]',
            expandLayout.left
          )}
        >
          <span className="flex w-[40px] justify-self-end">
            <ColResizerIcons
              initialSide="left"
              onLayoutChange={handleColResizer}
            />
          </span>
          <QuestionText questionText={qdata.info} />
        </section>

        {/* RIGHT COLUMN */}
        <section
          className={`min-h-[calc(100vh-308px)] overflow-hidden ${expandLayout.right}`}
        >
          <div className="ml-6 flex w-[40px] justify-self-start">
            <ColResizerIcons
              initialSide="right"
              onLayoutChange={handleColResizer}
            />
          </div>

          <div className="ml-[40px] mt-[50px] h-full">
            <QuestionMarkReview
              qid={qdata.id}
              handleToggleCheckboxVisibility={handleToggleCheckboxVisibility}
              isCheckboxVisible={isCheckboxVisible}
              qtype={qdata.type}
            />
            <h3 className="text-baseSize py-3 text-left font-sherpalReg leading-[28px]">
              {qdata.text}
            </h3>
            <div className="flex flex-col gap-[20px]">
              {qdata.type === 'free_text' ? (
                <QuestionFreeResponse
                  key={qdata.id}
                  questionId={qdata.id}
                  onOptionSelect={(qdata: string) => onOptionSelect?.(qdata)}
                />
              ) : (
                <>
                  {qdata.answers.map((option) => (
                    <QuestionChoice
                      key={option.id}
                      item={option}
                      isFreeText={false}
                      onOptionSelect={(item) => onOptionSelect?.(item)}
                      selectedAnswer={Number(selectedAnswer)}
                      disabledOptions={disabledOptions || {}}
                      onCheckboxChange={(optionId: string) =>
                        onCheckboxChange?.(String(optionId))
                      }
                      isCheckboxVisible={Boolean(isCheckboxVisible)}
                    />
                  ))}
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default QuestionCard;
