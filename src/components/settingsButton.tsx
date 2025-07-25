import React from 'react';
import { GearWideConnected } from 'react-bootstrap-icons';

import { isConfigured } from '../utils';

interface settingsButtonProps {
  onClick: () => void;
}

const SettingsButton: React.FC<settingsButtonProps> = ({ onClick }) => {
  return (
    <GearWideConnected
      size={20}
      className={`${isConfigured() ? 'text-secondary' : 'text-danger'}`}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
      title="Settings"
    />
  );
};

export default SettingsButton;
