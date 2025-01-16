import { createContext, ReactNode, useContext, useState } from 'react';

const themes = ['practice', 'domain', 'endurance']; // Add your themes here

const ThemeContext = createContext({
  theme: 'practice',
  toggleTheme: () => {
    console.log('toggleTheme is not implemented');
  },
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState('practice');

  const toggleTheme = () => {
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length; // Cyclic rotation
    const newTheme = themes[nextIndex];
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
