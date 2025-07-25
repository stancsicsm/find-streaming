import queryProviders from '../queryProviders';

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ results: [{ provider_id: 1, provider_name: 'Netflix' }] }),
  })
) as jest.Mock;

describe('queryProviders', () => {
  it('should fetch providers', async () => {
    const providers = await queryProviders(1);
    expect(providers.results).toEqual([{ provider_id: 1, provider_name: 'Netflix' }]);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('movie/1/watch/providers'),
      expect.any(Object)
    );
  });
});
