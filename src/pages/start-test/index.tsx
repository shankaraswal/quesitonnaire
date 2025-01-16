import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../components';
import LoadTest from './LoadTest';
import PreviewTest from './PreviewTest';
import SelectTest from './SelectTest';

const StartTestWrapper = () => {
  const [currentComponent, setCurrentComponent] = useState<number>(0);
  const navigate = useNavigate();

  const components: { [key: number]: JSX.Element } = {
    0: <SelectTest onFetchComplete={() => setCurrentComponent(1)} />,
    1: <LoadTest />,
    2: <PreviewTest />,
  };

  useEffect(() => {
    if (currentComponent === 1) {
      // TODO: remove this once actual api response is implemented
      const timer = setTimeout(() => {
        setCurrentComponent(2);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [currentComponent]);

  return (
    <div className="mx-auto grid h-full w-full grid-rows-[1fr_auto]">
      <section className="flex min-h-[calc(100vh-98px)] flex-col justify-center">
        {components[currentComponent]}
      </section>
      {currentComponent === 2 && (
        <section className="relative h-[78px] max-h-[98px] justify-end px-16 py-3 text-right">
          <Button variant="dark" onClick={() => navigate('/questionnaire')}>
            Next
          </Button>
        </section>
      )}
    </div>
  );
};

export default StartTestWrapper;
