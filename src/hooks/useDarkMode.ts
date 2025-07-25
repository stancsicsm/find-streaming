import { useState, useEffect } from 'react';

const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return document.documentElement.getAttribute('data-bs-theme') === 'dark';
  });

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const theme = isDarkMode ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-bs-theme', theme);
  }, [isDarkMode]);

  return { isDarkMode, toggleDarkMode };
};

export default useDarkMode;
