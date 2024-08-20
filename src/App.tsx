import React, { useState, useEffect } from "react";
import queryMovies from "./api/queryMovies";
import queryProviders from "./api/queryProviders";
import { Movie } from "./interfaces/movieInterfaces";
import MoviesTable from "./components/moviesTable";
import Filter from "./components/movieFilters";

const App: React.FC = () => {
  const [streamableMovies, setStreamableMovies] = useState<Movie[]>([]);
  const [filterParams, setFilterParams] = useState<
    Map<string, string | number>
  >(new Map());

  useEffect(() => {
    queryMovies(filterParams)
      .then((movies) => {
        return movies;
      })
      .then((movies) => {
        const providerPromises = movies.map((movie) =>
          queryProviders(movie.id)
        );

        Promise.all(providerPromises)
          .then((providersArray) => {
            const moviesWithProviders: Movie[] = movies.map((movie, index) => {
              const providers = providersArray[index];
              let providersHU = null;
              if (
                providers.results &&
                providers.results.HU &&
                providers.results.HU.flatrate
              ) {
                providersHU = providers.results.HU.flatrate;
              }
              return { ...movie, providers: providersHU };
            });
            const streamable: Movie[] = moviesWithProviders.filter((movie) => {
              return movie.providers;
            });
            setStreamableMovies(streamable);
          })
          .catch((error) => {
            console.error("Error fetching providers:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, [filterParams]);

  return (
    <div className="container">
      <h1>Pick Me a Movie</h1>
      <Filter filterParams={filterParams} setFilterParams={setFilterParams} />
      <MoviesTable movies={streamableMovies} />
    </div>
  );
};

export default App;
