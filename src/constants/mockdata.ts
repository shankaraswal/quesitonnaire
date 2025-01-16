// Import images
import assistiveTechImg from '../assets/icons/assistive-tech.svg';
import noDeviceLockImg from '../assets/icons/no-device-lock.svg';
import scoreInfoImg from '../assets/icons/score-info.svg';
import timingInfoImg from '../assets/icons/timing-info.svg';

export interface PreviewTestItem {
  title: string;
  desc: string;
  image: string;
  disabled: boolean;
}

export const previewTestMock: PreviewTestItem[] = [
  {
    title: 'Timing Info',
    desc: 'Practice tests are timed, but you can pause them. To continue on another device, you have to start over. We delete incomplete practice tests after 90 days.',
    image: timingInfoImg,
    disabled: false,
  },
  {
    title: 'Score Info',
    desc: 'When you finish the practice test, go to My Practice to see your scores and get personalized study tips.',
    image: scoreInfoImg,
    disabled: false,
  },
  {
    title: 'Assistive Tech',
    desc: 'Be sure to practice with any AT you use for testing. If you configure your AT settings here, you may need to repeat this step on test day.',
    image: assistiveTechImg,
    disabled: true,
  },
  {
    title: 'No Device Lock',
    desc: "We don't lock your device during practice. On test day, you'll be blocked from using other programs or apps.",
    image: noDeviceLockImg,
    disabled: false,
  },
];
