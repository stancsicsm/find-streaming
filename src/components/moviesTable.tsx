import { Film, Star } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';

import type { Movie } from '../interfaces/movieInterfaces';
import type { Provider } from '../interfaces/providerInterfaces';

import MovieDetailModal from './movieDetailModal';

interface MoviesTableProps {
  movies: Movie[];
  isLoading: boolean;
  emptySearch: boolean;
}

const providerLogoSrc = (provider: Provider) =>
  provider.provider_name === 'Radarr'
    ? '/radarrLogo.svg'
    : `https://image.tmdb.org/t/p/original${provider.logo_path}`;

const MoviesTable: React.FC<MoviesTableProps> = ({ movies, isLoading, emptySearch }) => {
  const [show, setShow] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleClose = () => setShow(false);
  const handleShow = (movie: Movie) => () => {
    setSelectedMovie(movie);
    setShow(true);
  };

  if (emptySearch) {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-muted">
        <Film size={28} />
        <p className="text-sm">Search for a movie</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <ul className="space-y-2">
        {Array.from({ length: 5 }, (_, row) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton rows never reorder
          <li key={row} className="animate-pulse rounded-xl border border-line bg-surface p-4">
            <div className="h-4 w-2/3 rounded bg-surface-2" />
            <div className="mt-2.5 h-3 w-1/3 rounded bg-surface-2" />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <>
      <ul className="space-y-2">
        {movies.map((movie: Movie, index) => (
          <li
            key={movie.id}
            className="animate-fade-up"
            style={{ animationDelay: `${index * 40}ms` }}
          >
            <button
              type="button"
              onClick={handleShow(movie)}
              className="flex w-full items-center gap-3 rounded-xl border border-line bg-surface p-3.5 text-left transition hover:border-accent/40 active:scale-[0.98]"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{movie.title}</p>
                <p className="mt-0.5 flex items-center gap-2 text-sm text-muted">
                  <span>{movie.release_date?.split('-')[0]}</span>
                  <span className="inline-flex items-center gap-1">
                    <Star size={11} className="text-amber-400" fill="currentColor" />
                    {movie.vote_average.toFixed(1)}
                  </span>
                </p>
              </div>
              {movie.providers?.length > 0 && (
                <div className="flex shrink-0 -space-x-2">
                  {movie.providers.map((provider) => (
                    <img
                      key={provider.provider_id}
                      alt={provider.provider_name}
                      title={provider.provider_name}
                      className="h-8 w-8 rounded-full ring-2 ring-surface"
                      src={providerLogoSrc(provider)}
                      width={32}
                      height={32}
                    />
                  ))}
                </div>
              )}
            </button>
          </li>
        ))}
      </ul>
      <MovieDetailModal show={show} handleClose={handleClose} movie={selectedMovie} />
    </>
  );
};

export default MoviesTable;
