import { render, screen } from '@testing-library/react';
import DarkModeToggle from '../darkModeToggle';

describe('DarkModeToggle component', () => {
  it('renders the dark mode toggle', () => {
    render(<DarkModeToggle />);
    const toggleElement = screen.getByTitle('Switch to dark mode');
    expect(toggleElement).toBeInTheDocument();
  });
});
