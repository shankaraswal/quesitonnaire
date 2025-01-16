import { useSelector } from 'react-redux';

import type { RootState } from '../../store';
import { DirectionPopover } from '..';
import CountDownTimer from '../widgets/CountDownTimer';
import QuestionCardNavigation from './QuestionCardNavigation';

const QuestionCardHeader = () => {
  const { metadata: questionnaireMetadata } = useSelector(
    (state: RootState) => state.questionnaireState
  );

  return (
    <div className="h-[100px] content-center bg-sherpalPrimaryBgColor">
      <div className="mx-[70px] grid grid-cols-[1fr_auto_1fr] items-center">
        <div className="text-left">
          <h1 className="font-sherpalReg text-h1 font-bold text-sherpalSecondaryTextColor">
            {questionnaireMetadata.questionnaire_title}
          </h1>
          <DirectionPopover />
        </div>
        <CountDownTimer />
        <QuestionCardNavigation />
      </div>
    </div>
  );
};
export default QuestionCardHeader;
