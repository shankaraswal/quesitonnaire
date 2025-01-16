function QuestionCardTitle({ length }: { length: number }) {
  return (
    <h4 className="mx-[70px] flex h-[50px] flex-col items-center justify-center rounded-b-[22px] bg-sherpalAccentBgColor font-sherpalReg text-h3 font-bold uppercase tracking-wider text-sherpalNeutralTextColor">
      This is a practice test with {length} questions.
    </h4>
  );
}

export default QuestionCardTitle;
