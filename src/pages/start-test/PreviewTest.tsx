import { twMerge } from 'tailwind-merge';

import { PreviewTestItem, previewTestMock } from '../../constants/mockdata';

const PreviewTest = () => {
  return (
    <>
      <h1 className="text-largeSize mb-6 text-center">Practice Test</h1>
      <div className="border-shearpalBorderDefault text-smallSize relative mx-auto flex w-[510px] flex-col items-center gap-[32px] rounded-reg border-2 bg-sherpalAccentBgColor p-[30px] text-center shadow-custom">
        {previewTestMock.map((item: PreviewTestItem) => (
          <div
            className={twMerge(
              'flex flex-row gap-6',
              item.disabled && '!opacity-50'
            )}
            key={item.title}
          >
            <div className="aspect-squre flex h-[44px] w-[44px] content-center items-center justify-center overflow-hidden rounded-full bg-[#d9d9d9] p-2">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-contain"
                />
              )}
            </div>
            <div className="w-[400px]">
              <h2 className="w-full text-left font-semibold">{item.title}</h2>
              <p className="w-full text-left leading-[28px]">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PreviewTest;
