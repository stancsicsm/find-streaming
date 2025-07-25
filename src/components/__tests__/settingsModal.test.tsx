import { render, screen } from '@testing-library/react';
import SettingsModal from '../settingsModal';
import queryCountries from '../../api/queryCountries';
import queryProviders from '../../api/queryProviders';

jest.mock('../../api/queryCountries');
jest.mock('../../api/queryProviders');

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ results: [] }),
  })
) as jest.Mock;

describe('SettingsModal component', () => {
  it('renders the settings modal', async () => {
    (queryCountries as jest.Mock).mockResolvedValue([]);
    (queryProviders as jest.Mock).mockResolvedValue({ results: [] });
    render(<SettingsModal show={true} handleClose={() => {}} />);
    const modalTitle = await screen.findByText(/Settings/);
    expect(modalTitle).toBeInTheDocument();
  });
});
