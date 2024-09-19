import React, {useState, useEffect} from "react";
import {Container} from 'react-bootstrap';

import {Country} from "./interfaces/countryInterface";
import {Genre} from "./interfaces/genreInterface";
import {Movie} from "./interfaces/movieInterfaces";
import {ProvidersResponse, Provider} from "./interfaces/providerInterfaces";
import {TrailerResponse, Trailer} from "./interfaces/trailerInterface";

import Filters from "./components/filters";
import Footer from "./components/footer";
import MoviesTable from "./components/moviesTable";
import Title from "./components/title";

import queryCountries from "./api/queryCountries";
import queryGenres from "./api/queryGenres";
import queryMovies from "./api/queryMovies";
import queryProviders from "./api/queryProviders";
import queryTrailers from "./api/queryTrailers";

const App: React.FC = () => {
  const [streamableMovies, setStreamableMovies] = useState<Movie[]>([]);
  const [filterParams, setFilterParams] = useState<
    Map<string, string | number>
  >(new Map());
  const [countryOptions, setCountryOptions] = useState<Country[]>([]);
  const [selectedCountryId, setSelectedCountryId] = useState("HU");
  const [genreOptions, setGenreOptions] = useState<Genre[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const countryFilterProps = {
    countries: countryOptions,
    selectedCountryId: selectedCountryId,
    setSelectedCountryId: setSelectedCountryId
  }
  const movieFilterProps = {
    filterParams: filterParams,
    setFilterParams: setFilterParams,
    genreOptions: genreOptions,
    totalPages: totalPages
  }

  useEffect(() => {
    queryCountries()
      .then((countries) => {
        setCountryOptions(countries);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  useEffect(() => {
    queryGenres()
      .then((genres) => {
        setGenreOptions(genres.genres);
      })
      .catch((error) => {
        console.error("Error fetching genres:", error);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    queryMovies(filterParams)
      .then((moviesResponse) => {
        setTotalPages(moviesResponse.total_pages);
        const movies: Movie[] = moviesResponse.results;
        const providerPromises = movies.map((movie) =>
          queryProviders(movie.id)
        );
        const trailerPromises = movies.map((movie) =>
          queryTrailers(movie.id)
        );

        Promise.all(providerPromises)
          .then((providersArray: ProvidersResponse[]) => {
            Promise.all(trailerPromises)
              .then((trailersArray: TrailerResponse[]) => {
                const moviesWithProvidersAndTrailers: Movie[] = movies.map((movie, index) => {
                  const providers = providersArray[index];
                  const providersCountry: Provider[] = providers
                    .results
                    ?.[selectedCountryId]
                    ?.flatrate || [];
                  const trailers: Trailer[] = trailersArray[index].results;
                  const trailerKey: string = trailers
                    .filter((trailer) => trailer.official && trailer.type === 'Trailer' && trailer.site === 'YouTube')
                    .sort((a, b) => Date.parse(b.published_at) - Date.parse(a.published_at))
                    .slice(0, 1)
                    .map((trailer) => trailer.key)[0];
                  return {...movie, providers: providersCountry, trailerKey: trailerKey };
                });
                const streamable: Movie[] = moviesWithProvidersAndTrailers
                  .filter((movie) => movie.providers.length)
                  .sort((a, b) => b.vote_average - a.vote_average);
                setStreamableMovies(streamable);
                setIsLoading(false);
              })
              .catch((error) => {
                console.error("Error fetching trailers:", error);
              });
          })
          .catch((error) => {
            console.error("Error fetching providers:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, [filterParams, selectedCountryId]);

  return (
      <Container>
        <Title />
        <Filters countryFilterProps={countryFilterProps} movieFilterProps={movieFilterProps} />
        <MoviesTable movies={streamableMovies} genreOptions={genreOptions} isLoading={isLoading} />
        <Footer totalPages={totalPages} filterParams={filterParams} />
      </Container>
  );
};

export default App;
