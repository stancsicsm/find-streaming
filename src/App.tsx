import React, { useState, useEffect } from "react";
import queryMovies from "./api/queryMovies";
import queryProviders from "./api/queryProviders";
import { Movie } from "./interfaces/movieInterfaces";
import MoviesTable from "./components/moviesTable";
import Filter from "./components/movieFilters";
import {ProvidersResponse, Provider} from "./interfaces/providerInterfaces";
import { Container, Row, Col } from 'react-bootstrap';

const App: React.FC = () => {
  const [streamableMovies, setStreamableMovies] = useState<Movie[]>([]);
  const [filterParams, setFilterParams] = useState<
    Map<string, string | number>
  >(new Map());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    queryMovies(filterParams)
      .then((movies) => {
        const providerPromises = movies.map((movie) =>
          queryProviders(movie.id)
        );

        Promise.all(providerPromises)
          .then((providersArray: ProvidersResponse[]) => {
            const moviesWithProviders: Movie[] = movies.map((movie, index) => {
              const providers = providersArray[index];
              const providersHU: Provider[] = providers.results?.HU?.flatrate || [];
                return { ...movie, providers: providersHU };
            });
            const streamable: Movie[] = moviesWithProviders.filter((movie) => movie.providers.length);
            setStreamableMovies(streamable);
            setIsLoading(false);
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
      <Container>
        <Row className="justify-content-md-center mb-3">
          <Col md="8">
            <h1 >Pick Me a Movie</h1>
          </Col>
        </Row>
        <Row className="justify-content-md-center mb-3">
          <Col md="8">
            <Filter filterParams={filterParams} setFilterParams={setFilterParams} />
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
