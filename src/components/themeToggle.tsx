import React from "react";
import { Form } from "react-bootstrap";
import { useTheme } from "../contexts/ThemeContext";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Form.Group className="mb-3" controlId="themeToggle">
      <Form.Label>Theme</Form.Label>
      <Form.Check
        type="switch"
        id="theme-switch"
        label={theme === "dark" ? "Dark Mode" : "Light Mode"}
        checked={theme === "dark"}
        onChange={toggleTheme}
        className="fs-6"
      />
    </Form.Group>
  );
};

export default ThemeToggle;
