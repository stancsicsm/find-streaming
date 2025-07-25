import { MoviesResponse } from '../interfaces/movieInterfaces';
import { getTmdbOptions } from '../utils';
import queryRadarrMovies from './queryRadarrMovies';

const queryMovies = async (
  filterParams: Map<string, string | number> = new Map(),
): Promise<MoviesResponse> => {
  let baseUrl: string;
  const urlParams = new URLSearchParams({
    include_adult: 'false',
    sort_by: 'popularity.desc',
    ...Object.fromEntries(filterParams.entries()),
  });

  if (filterParams.get('query')) {
    baseUrl = 'https://api.themoviedb.org/3/search/movie';
  } else {
    baseUrl = 'https://api.themoviedb.org/3/discover/movie';
  }

  const response = await fetch(`${baseUrl}?${urlParams.toString()}`, getTmdbOptions());
  const moviesResponse = (await response.json()) as MoviesResponse;

  const radarrUrl = localStorage.getItem('radarrUrl');
  const radarrApiKey = localStorage.getItem('radarrApiKey');

  if (radarrUrl && radarrApiKey) {
    const radarrMovies = await queryRadarrMovies();
    const radarrTmdbIds = new Set(radarrMovies.map((movie) => movie.tmdbId));

    moviesResponse.results.forEach((movie) => {
      if (radarrTmdbIds.has(movie.id)) {
        movie.providers.push({
          logo_path: '/radarr_logo.svg',
          provider_id: -1,
          provider_name: 'Radarr',
          display_priority: 0,
        });
      }
    });
  }

  return moviesResponse;
};

export default queryMovies;
