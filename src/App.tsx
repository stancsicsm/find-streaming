import type React from 'react';
import { useEffect, useState } from 'react';
import queryMovies from './api/queryMovies';
import queryProviders from './api/queryProviders';
import queryRadarrMovies from './api/queryRadarrMovies';
import DarkModeToggle from './components/darkModeToggle';
import Footer from './components/footer';
import MovieFilter from './components/movieFilter';
import MoviesTable from './components/moviesTable';
import PageNavigation from './components/pageNavigation';
import SettingsButton from './components/settingsButton';
import SettingsModal from './components/settingsModal';
import Title from './components/title';
import type { Movie, RadarrMovie } from './interfaces/movieInterfaces';
import type { Provider, ProvidersResponse } from './interfaces/providerInterfaces';

import { getConfig, isConfigured } from './utils';

const App: React.FC = () => {
  const [moviesToShow, setMoviesToShow] = useState<Movie[]>([]);
  const [filterParams, setFilterParams] = useState<Map<string, string | number>>(new Map());
  const [emptySearch, setEmptySearch] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const movieFilterProps = {
    filterParams: filterParams,
    setFilterParams: setFilterParams,
  };

  useEffect(() => {
    setIsLoading(true);
    if (!filterParams.get('query')) {
      setEmptySearch(true);
      setIsLoading(false);
      return;
    } else {
      setEmptySearch(false);
    }

    queryMovies(filterParams)
      .then((moviesResponse) => {
        setTotalPages(moviesResponse.total_pages);
        const movies: Movie[] = moviesResponse.results;
        const providerPromises = movies.map((movie) => queryProviders(movie.id));
        const radarrMoviesPromise = queryRadarrMovies();

        Promise.all([Promise.all(providerPromises), radarrMoviesPromise])
          .then(([providersArray, radarrMovies]: [ProvidersResponse[], RadarrMovie[]]) => {
            const moviesWithProviders: Movie[] = movies.map((movie, index) => {
              const providers = providersArray[index];
              const providersForSingleMovie: Provider[] =
                providers.results?.[getConfig('country') ?? '']?.flatrate || [];

              const movieInRadarr = radarrMovies.find(
                (radarrMovie) => radarrMovie.tmdbId === movie.id,
              );
              if (movieInRadarr) {
                const radarrProvider: Provider = {
                  provider_id: -1,
                  provider_name: 'Radarr',
                  logo_path: '',
                  display_priority: 0,
                };
                providersForSingleMovie.push(radarrProvider);
              }

              return { ...movie, providers: providersForSingleMovie };
            });
            setMoviesToShow(moviesWithProviders);
            setIsLoading(false);
          })
          .catch((error) => {
            console.error('Error fetching providers or Radarr movies:', error);
            setIsLoading(false);
          });
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
        setIsLoading(false);
      });
  }, [filterParams]);

  return (
    <div className="mx-auto max-w-lg px-4 pb-8">
      <header className="sticky top-0 z-10 -mx-4 flex items-center justify-between bg-bg/80 px-4 py-3 backdrop-blur">
        <Title />
        <div className="flex items-center gap-1">
          <DarkModeToggle />
          <SettingsButton onClick={() => setShowSettings(true)} />
        </div>
      </header>
      {!isConfigured() && (
        <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          Set API keys in the settings.
        </div>
      )}
      <MovieFilter {...movieFilterProps} />
      <MoviesTable movies={moviesToShow} isLoading={isLoading} emptySearch={emptySearch} />
      {totalPages > 1 && <PageNavigation {...movieFilterProps} totalPages={totalPages} />}
      {!emptySearch && <Footer totalPages={totalPages} filterParams={filterParams} />}
      <SettingsModal show={showSettings} handleClose={() => setShowSettings(false)} />
    </div>
  );
};

export default App;
