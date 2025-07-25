import queryCountries from '../queryCountries';

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([{ iso_3166_1: 'US', english_name: 'United States' }]),
  })
) as jest.Mock;

describe('queryCountries', () => {
  it('should fetch countries', async () => {
    const countries = await queryCountries();
    expect(countries).toEqual([{ iso_3166_1: 'US', english_name: 'United States' }]);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('configuration/countries'),
      expect.any(Object)
    );
  });
});
