import queryMovies from '../queryMovies';

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ results: [{ id: 1, title: 'Movie 1' }] }),
  })
) as jest.Mock;

describe('queryMovies', () => {
  it('should fetch movies', async () => {
    const filterParams = new Map<string, string | number>();
    filterParams.set('language', 'en-US');
    filterParams.set('watch_region', 'US');
    filterParams.set('with_watch_providers', 'netflix');
    const movies = await queryMovies(filterParams);
    expect(movies.results).toEqual([{ id: 1, title: 'Movie 1' }]);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('discover/movie'),
      expect.any(Object)
    );
  });
});
