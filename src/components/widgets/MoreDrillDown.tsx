import Help from './Help';
import KeyboardShortcuts from './KeyboardShortcuts';
import SaveAndExit from './SaveAndExit';

const MoreDrillDown = ({
  openMoreModal,
  modalContent,
  setOpenMoreModal,
}: {
  openMoreModal: boolean;
  modalContent: { title: string };
  setOpenMoreModal: (show: boolean) => void;
}) => {
  if (!openMoreModal) return null;

  return (
    <>
      <div className="h-full max-h-[60vh] overflow-y-auto">
        {modalContent.title === 'help' && (
          <Help
            openMoreModal={openMoreModal}
            setOpenMoreModal={setOpenMoreModal}
          />
        )}
        {modalContent.title === 'shortcuts' && (
          <KeyboardShortcuts
            openMoreModal={openMoreModal}
            setOpenMoreModal={setOpenMoreModal}
          />
        )}
        {modalContent.title === 'savenexit' && (
          <SaveAndExit
            openMoreModal={openMoreModal}
            setOpenMoreModal={setOpenMoreModal}
          />
        )}
      </div>
    </>
  );
};
export default MoreDrillDown;
