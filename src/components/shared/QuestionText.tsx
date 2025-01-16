const QuestionText = ({ questionText }: { questionText: string }) => {
  return (
    <div className="mt-[50px]">
      <p className="text-left text-h2 font-normal leading-[33px] text-sherpalNeutralTextColor">
        {questionText}
      </p>
    </div>
  );
};
export default QuestionText;
