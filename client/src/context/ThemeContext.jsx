import React, { createContext, useContext, useEffect, useState } from 'react';
import { safeStorage } from '../utils/safeStorage';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = safeStorage.getItem('portfolio_theme');
    if (savedTheme) return savedTheme;
    try {
      if (typeof window !== 'undefined' && window.matchMedia) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'dark';
      }
    } catch (e) {
      // Fallback if matchMedia fails in iOS WKWebView
    }
    return 'dark';
  });

  const [cursorEnabled, setCursorEnabled] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    safeStorage.setItem('portfolio_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleCursor = () => {
    setCursorEnabled((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, cursorEnabled, toggleCursor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
