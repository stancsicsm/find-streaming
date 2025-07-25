import React from 'react';
import { MoonFill, SunFill } from 'react-bootstrap-icons';
import useDarkMode from '../hooks/useDarkMode';

const DarkModeToggle: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const IconComponent = isDarkMode ? SunFill : MoonFill;

  return (
    <IconComponent
      size={24}
      className="text-secondary"
      onClick={toggleDarkMode}
      style={{ cursor: 'pointer' }}
      title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    />
  );
};

export default DarkModeToggle;
