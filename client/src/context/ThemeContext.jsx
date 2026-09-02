import React, { createContext, useContext, useEffect, useState } from 'react';
import { safeStorage } from '../utils/safeStorage';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme] = useState('dark');
  const [cursorEnabled, setCursorEnabled] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('dark');
    safeStorage.setItem('portfolio_theme', 'dark');
  }, []);

  const toggleTheme = () => {
    // Portfolio is locked to dark mode
  };

  const toggleCursor = () => {
    setCursorEnabled((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ theme: 'dark', toggleTheme, cursorEnabled, toggleCursor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
