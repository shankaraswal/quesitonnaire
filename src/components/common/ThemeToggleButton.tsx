import { IoIosSwitch } from 'react-icons/io';

import { useTheme } from '../../context/ThemeProvider';

const ThemeToggle = () => {
  const { toggleTheme } = useTheme();

  return (
    <button
      className="text-smallSize flex cursor-pointer flex-col justify-center border-b-2 border-transparent p-2 font-semibold text-sherpalSecondaryTextColor hover:border-sherpalAccentBordergColor"
      onClick={toggleTheme}
    >
      <IoIosSwitch size={20} className="mx-auto mb-2" />
      Next theme
    </button>
  );
};

export default ThemeToggle;
