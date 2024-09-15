import React, { useState, useEffect } from "react";
import queryMovies from "./api/queryMovies";
import queryProviders from "./api/queryProviders";
import queryTrailers from "./api/queryTrailers";
import queryCountries from "./api/queryCountries";
import { Movie } from "./interfaces/movieInterfaces";
import MoviesTable from "./components/moviesTable";
import Filter from "./components/movieFilters";
import { ProvidersResponse, Provider } from "./interfaces/providerInterfaces";
import { TrailerResponse, Trailer } from "./interfaces/trailerInterface"
import { Container, Row, Col } from 'react-bootstrap';
import CountryFilter from "./components/countryFilter";
import {Country} from "./interfaces/countryInterface";

const App: React.FC = () => {
  const [streamableMovies, setStreamableMovies] = useState<Movie[]>([]);
  const [filterParams, setFilterParams] = useState<
    Map<string, string | number>
  >(new Map());
  const [countryOptions, setCountryOptions] = useState<Country[]>([]);
  const [selectedCountryId, setSelectedCountryId] = useState("HU");
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

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
        <Row className="justify-content-md-center mb-3">
          <Col md="6">
            <h1 >Pick Me a Movie</h1>
          </Col>
          <Col md="2" className="d-flex align-items-center">
            <CountryFilter
              countries={countryOptions}
              selectedCountryId={selectedCountryId}
              setSelectedCountryId={setSelectedCountryId}
            />
          </Col>
        </Row>
        <Row className="justify-content-md-center mb-3">
          <Col md="8">
            <Filter
              filterParams={filterParams}
              setFilterParams={setFilterParams}
              totalPages={totalPages}
            />
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md="8">
            <MoviesTable movies={streamableMovies} isLoading={isLoading} />
          </Col>
        </Row>
      </Container>
  );
};

export default App;
