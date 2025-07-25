import { render, screen } from '@testing-library/react';
import MoviesTable from '../moviesTable';
import { Movie } from '../../interfaces/movieInterfaces';

describe('MoviesTable component', () => {
  const movies: Movie[] = [
    {
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
    },
  ];

  it('renders the movies table', () => {
    render(
      <MoviesTable
        movies={movies}
        handleMovieClick={() => {}}
        radarrMovies={[]}
        isLoading={false}
      />
    );
    const tableElement = screen.getByText(/Movie 1/i);
    expect(tableElement).toBeInTheDocument();
  });
});
