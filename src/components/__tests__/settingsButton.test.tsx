import { render, screen } from '@testing-library/react';
import SettingsButton from '../settingsButton';

describe('SettingsButton component', () => {
  it('renders the settings button', () => {
    render(<SettingsButton onClick={() => {}} />);
    const buttonElement = screen.getByTitle('Settings');
    expect(buttonElement).toBeInTheDocument();
  });
});
