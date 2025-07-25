import React, { useEffect, useState } from 'react';
import { Alert, Container } from 'react-bootstrap';

import { Movie, RadarrMovie } from './interfaces/movieInterfaces';
import { Provider, ProvidersResponse } from './interfaces/providerInterfaces';

import Title from './components/title';
import Footer from './components/footer';
import MoviesTable from './components/moviesTable';
import MovieFilter from './components/movieFilter';
import PageNavigation from './components/pageNavigation';
import SettingsModal from './components/settingsModal';
import SettingsButton from './components/settingsButton';
import DarkModeToggle from './components/darkModeToggle';

import queryMovies from './api/queryMovies';
import queryProviders from './api/queryProviders';
import queryRadarrMovies from './api/queryRadarrMovies';

import { isConfigured } from './utils';

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
                providers.results?.[localStorage.getItem('country') ?? 'HU']?.flatrate || [];

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
    <Container>
      <div className="d-flex justify-content-between">
        <Title />
        <div className="d-flex align-items-center gap-3">
          <DarkModeToggle />
          <SettingsButton onClick={() => setShowSettings(true)} />
        </div>
      </div>
      {!isConfigured() && (
        <Alert variant="danger" dismissible>
          Set API keys in the settings.
        </Alert>
      )}
      <MovieFilter {...movieFilterProps} />
      <MoviesTable movies={moviesToShow} isLoading={isLoading} emptySearch={emptySearch} />
      {totalPages > 1 && <PageNavigation {...movieFilterProps} totalPages={totalPages} />}
      {!emptySearch && <Footer totalPages={totalPages} filterParams={filterParams} />}
      <SettingsModal show={showSettings} handleClose={() => setShowSettings(false)} />
    </Container>
  );
};

export default App;
