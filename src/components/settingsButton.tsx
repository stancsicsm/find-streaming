import React from "react";
import {Button} from 'react-bootstrap';
import {GearWideConnected} from "react-bootstrap-icons";

import {isConfigured} from "../utils";

interface settingsButtonProps {
  onClick: () => void;
}

const SettingsButton: React.FC<settingsButtonProps> = ({onClick}) => {
  return (
    <Button
      variant="link"
      size="lg"
      className={`flex-column ${isConfigured() ? 'text-secondary' : 'text-danger'}`}
      onClick={onClick}
    >
      <GearWideConnected/>
    </Button>
  );
};

export default SettingsButton;
