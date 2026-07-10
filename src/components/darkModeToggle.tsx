import { Moon, Sun } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';
import useDarkMode from '../hooks/useDarkMode';

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

  const IconComponent = isDarkMode ? Sun : Moon;

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="rounded-full p-2.5 text-muted transition hover:bg-surface-2 hover:text-ink"
      title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <IconComponent
        size={18}
        className={`transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          showIcon ? 'rotate-0 scale-100 opacity-100' : 'rotate-180 scale-110 opacity-0'
        }`}
      />
    </button>
  );
};

export default DarkModeToggle;
