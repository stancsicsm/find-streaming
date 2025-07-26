import { render, screen } from '@testing-library/react';
import MovieDetailModal from '../movieDetailModal';
import { Movie } from '../../interfaces/movieInterfaces';
import queryTrailers from '../../api/queryTrailers';

jest.mock('../../api/queryTrailers');

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ results: [] }),
  })
) as jest.Mock;

describe('MovieDetailModal component', () => {
  const movie: Movie = {
    id: 1,
    title: 'Movie 1',
    overview: 'Overview',
    poster_path: '/path.jpg',
    release_date: '2022-01-01',
    genre_ids: [],
    original_language: 'en',
    original_title: 'Movie 1',
    popularity: 1,
    video: false,
    vote_average: 1,
    vote_count: 1,
    adult: false,
    providers: [],
  };

  it('renders the movie detail modal', async () => {
    (queryTrailers as jest.Mock).mockResolvedValue({ results: [] });
    render(
      <MovieDetailModal
        show={true}
        handleClose={() => {}}
        movie={movie}
        radarrMovies={[]}
      />
    );
    const modalTitle = await screen.findByText(/Movie 1/);
    expect(modalTitle).toBeInTheDocument();
  });
});
