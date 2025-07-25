import queryRadarrHealth from '../queryRadarrHealth';

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ appName: 'Radarr' }),
  })
) as jest.Mock;

describe('queryRadarrHealth', () => {
  it('should fetch Radarr health', async () => {
    const response = await queryRadarrHealth();
    const health = await response.json();
    expect(health.appName).toEqual('Radarr');
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/v3/health')
    );
  });
});
