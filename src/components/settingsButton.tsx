import { Settings } from 'lucide-react';
import type React from 'react';

import { isConfigured } from '../utils';

interface settingsButtonProps {
  onClick: () => void;
}

const SettingsButton: React.FC<settingsButtonProps> = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full p-2.5 transition hover:bg-surface-2 ${
        isConfigured() ? 'text-muted hover:text-ink' : 'text-red-400'
      }`}
      title="Settings"
    >
      <Settings size={18} />
    </button>
  );
};

export default SettingsButton;
