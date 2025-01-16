import { IoClose } from 'react-icons/io5';

const ExitPracticeTestModal = ({
  openMoreModal,
  setOpenMoreModal,
}: {
  openMoreModal: boolean;
  setOpenMoreModal: (show: boolean) => void;
}) => {
  return (
    <div
      className="fixed inset-0 z-40 bg-black bg-opacity-50"
      onClick={() => setOpenMoreModal(false)}
    >
      {openMoreModal && (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="bg-white w-[770px] rounded-lg shadow-lg p-6 relative text-left"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-h1 mb-4">Save and Exit</h2>
              <button
                onClick={() => setOpenMoreModal(false)}
                className="text-gray-500 hover:text-gray-700 absolute top-6 right-6"
              >
                <IoClose className="h-6 w-6" />
              </button>

              <div className="mt-4">
                <p className="text-gray-600">
                  If you exit now, we'll save your progress on this device, and
                  you can resume this practice test anytime. If you log in on
                  another device, you'll need to start the practice test over.
                </p>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setOpenMoreModal(false)}
                  className="px-4 py-2 text-sherpalSecondarytextColor border !border-black rounded hover:bg-sherpalSecondaryBgColor hover:text-white"
                >
                  Continue Practice Test
                </button>
                <button
                  onClick={() => setOpenMoreModal(false)}
                  className="px-4 py-2 border !border-black bg-yellow-500 text-black rounded hover:bg-yellow-600"
                >
                  Save and Exit
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ExitPracticeTestModal;
