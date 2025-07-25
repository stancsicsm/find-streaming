import React from "react";
import {Button} from 'react-bootstrap';
import {MoonFill, SunFill} from "react-bootstrap-icons";
import useDarkMode from "../hooks/useDarkMode";

const DarkModeToggle: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <Button
      variant="link"
      size="lg"
      className="flex-column text-secondary"
      onClick={toggleDarkMode}
      title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? <SunFill /> : <MoonFill />}
    </Button>
  );
};

export default DarkModeToggle;
