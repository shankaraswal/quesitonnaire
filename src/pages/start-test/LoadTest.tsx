import { SpinLoader } from '../../components';

const LoadTest = () => {
  return (
    <>
      <h1
        className="text-largeSize text-center"
        dangerouslySetInnerHTML={{
          __html: "We're Preparing Your Practice test",
        }}
      />
      <div className="border-sherpalBorderDefault text-baseSize relative mx-auto mt-6 flex w-[510px] flex-col items-center rounded-reg border-2 bg-sherpalAccentBgColor p-6 text-center shadow-custom">
        <span className="mb-20 mt-4">
          <SpinLoader />
        </span>
        <p className="text-sherpalBaseText text-baseSize bottom-0 w-full p-6">
          This is the Load Test page of our application. Pleas wait while we are
          loading your test.
        </p>
      </div>
    </>
  );
};
export default LoadTest;
