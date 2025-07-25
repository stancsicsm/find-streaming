import React, { useState } from 'react';
import { MoonFill, SunFill } from 'react-bootstrap-icons';
import useDarkMode from '../hooks/useDarkMode';

import '../styles/animations.css';

const DarkModeToggle: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [showIcon, setShowIcon] = useState(true);

  const handleToggle = () => {
    setShowIcon(false);

    // Short delay to create a smooth transition effect
    setTimeout(() => {
      toggleDarkMode();
      setShowIcon(true);
    }, 150);
  };

  const IconComponent = isDarkMode ? SunFill : MoonFill;

  const iconStyle: React.CSSProperties = {
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: showIcon ? 'rotate(0deg) scale(1)' : 'rotate(180deg) scale(1.1)',
    opacity: showIcon ? 1 : 0,
  };

  return (
    <IconComponent
      size={20}
      className={`text-secondary ${showIcon ? 'icon-fade-in' : ''}`}
      onClick={handleToggle}
      style={iconStyle}
      title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    />
  );
};

export default DarkModeToggle;
