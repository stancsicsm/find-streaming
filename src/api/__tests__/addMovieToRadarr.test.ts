import addMovieToRadarr from '../addMovieToRadarr';
import queryRootFolder from '../queryRootFolder';

jest.mock('../queryRootFolder');

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ title: 'Movie 1' }),
  })
) as jest.Mock;

describe('addMovieToRadarr', () => {
  it('should add a movie to Radarr', async () => {
    (queryRootFolder as jest.Mock).mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve([{ path: '/movies', accessible: true }]),
    });

    const response = await addMovieToRadarr(1, 'Movie 1');
    const responseJson = await response.json();
    expect(responseJson.title).toEqual('Movie 1');
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/v3/movie'),
      expect.any(Object)
    );
  });
});
