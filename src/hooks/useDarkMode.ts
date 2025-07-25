import {useState, useEffect} from 'react';

const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return document.documentElement.getAttribute('data-bs-theme') === 'dark';
  });

  const toggleDarkMode = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    document.documentElement.setAttribute('data-bs-theme', newTheme);
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const theme = isDarkMode ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
  }, [isDarkMode]);

  useEffect(() => {
    const theme = isDarkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-bs-theme', theme);
  }, []);

  return {isDarkMode, toggleDarkMode};
};

export default useDarkMode;
