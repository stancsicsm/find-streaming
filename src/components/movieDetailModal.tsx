import { Star } from 'lucide-react';
import type React from 'react';
import { useEffect, useState } from 'react';
import addMovieToRadarr from '../api/addMovieToRadarr';

import queryTrailers from '../api/queryTrailers';
import type { Movie } from '../interfaces/movieInterfaces';
import Modal from './modal';

interface MovieDetailModalProps {
  show: boolean;
  handleClose: () => void;
  movie: Movie | null;
}

const alertStyles: Record<string, string> = {
  success: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-500',
  warning: 'border-amber-500/30 bg-amber-500/10 text-amber-500',
  danger: 'border-red-500/30 bg-red-500/10 text-red-400',
};

const MovieDetailModal: React.FC<MovieDetailModalProps> = ({ show, handleClose, movie }) => {
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [radarrMessage, setRadarrMessage] = useState<{ message: string; variant: string }>({
    message: '',
    variant: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: show is a deliberate trigger to reset the message when the modal opens/closes
  useEffect(() => {
    setRadarrMessage({ message: '', variant: '' });
  }, [show]);

  useEffect(() => {
    if (!movie) return;
    setTrailerKey(null);
    queryTrailers(movie.id).then((trailerResponse) => {
      const trailers = trailerResponse.results;
      const key: string = trailers
        .filter(
          (trailer) => trailer.official && trailer.type === 'Trailer' && trailer.site === 'YouTube',
        )
        .sort((a, b) => Date.parse(b.published_at) - Date.parse(a.published_at))
        .slice(0, 1)
        .map((trailer) => trailer.key)[0];
      setTrailerKey(key);
    });
  }, [movie]);

  if (!movie) {
    return null;
  }

  const handleAddToRadarr = () => {
    setIsLoading(true);
    addMovieToRadarr(movie.id, movie.title)
      .then((response) => {
        if (response.status === 201) {
          setIsLoading(false);
          setRadarrMessage({
            message: `${movie.title} added to Radarr`,
            variant: 'success',
          });
          return;
        }
        return response.json();
      })
      .then((data) => {
        setIsLoading(false);
        if (!data) {
          return;
        }
        if (data[0].errorCode === 'MovieExistsValidator') {
          setRadarrMessage({
            message: `${movie.title} already added to Radarr`,
            variant: 'warning',
          });
        } else {
          setRadarrMessage({
            message: `Failed to add ${movie.title} to Radarr`,
            variant: 'danger',
          });
        }
      })
      .catch((error) => {
        setRadarrMessage({
          message: `Failed to add ${movie.title} to Radarr`,
          variant: 'danger',
        });
        console.error(error);
      });
  };

  return (
    <Modal
      show={show}
      onClose={handleClose}
      title={`${movie.title} (${movie.release_date?.split('-')[0]})`}
      footer={
        <>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleAddToRadarr}
            disabled={isLoading}
          >
            {isLoading && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            )}
            Add to Radarr
          </button>
          <button type="button" className="btn btn-ghost ml-auto" onClick={handleClose}>
            Close
          </button>
        </>
      }
    >
      {radarrMessage.message && (
        <div
          className={`mb-4 rounded-xl border px-4 py-3 text-sm ${alertStyles[radarrMessage.variant] ?? ''}`}
        >
          {radarrMessage.message}
        </div>
      )}

      {movie.backdrop_path && (
        <div className="relative mb-4 overflow-hidden rounded-xl">
          <img
            src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface/60 to-transparent" />
        </div>
      )}
      <p className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-surface-2 px-3 py-1 text-sm">
        <Star size={12} className="text-amber-400" fill="currentColor" />
        {movie.vote_average.toFixed(1)} / 10
      </p>
      <p className="text-sm leading-relaxed text-muted">{movie.overview}</p>
      {movie.providers.length > 0 && (
        <>
          <h3 className="mt-5 mb-2 text-sm font-semibold">Streaming Platforms</h3>
          <div className="flex flex-wrap gap-2">
            {movie.providers.map((provider) => (
              <span
                key={provider.provider_id}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface-2 py-1 pr-3 pl-1 text-sm"
              >
                <img
                  alt={provider.provider_name}
                  className="h-6 w-6 rounded-full"
                  src={
                    provider.provider_name === 'Radarr'
                      ? '/radarrLogo.svg'
                      : `https://image.tmdb.org/t/p/original${provider.logo_path}`
                  }
                  width={24}
                  height={24}
                />
                {provider.provider_name}
              </span>
            ))}
          </div>
        </>
      )}
      {trailerKey && (
        <>
          <h3 className="mt-5 mb-2 text-sm font-semibold">Trailer</h3>
          <iframe
            key={trailerKey}
            className="aspect-video w-full rounded-xl border border-line"
            src={`https://www.youtube.com/embed/${trailerKey}`}
            title={movie.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </>
      )}
    </Modal>
  );
};

export default MovieDetailModal;
