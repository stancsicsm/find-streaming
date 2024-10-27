import React, {useEffect, useState} from "react";
import {Container} from 'react-bootstrap';

import {Movie} from "./interfaces/movieInterfaces";
import {Provider, ProvidersResponse} from "./interfaces/providerInterfaces";

import Title from "./components/title";
import Footer from "./components/footer";
import MoviesTable from "./components/moviesTable";
import MovieFilter from "./components/movieFilter";

import queryMovies from "./api/queryMovies";
import queryProviders from "./api/queryProviders";

const App: React.FC = () => {
  const [moviesToShow, setMoviesToShow] = useState<Movie[]>([]);
  const [filterParams, setFilterParams] = useState<
    Map<string, string | number>
  >(new Map());
  const [emptySearch, setEmptySearch] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const movieFilterProps = {
    filterParams: filterParams,
    setFilterParams: setFilterParams,
    totalPages: totalPages
  }

  useEffect(() => {
    setIsLoading(true);
    if (!filterParams.get("query")) {
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
        const providerPromises = movies.map((movie) =>
          queryProviders(movie.id)
        );
        Promise.all(providerPromises)
          .then((providersArray: ProvidersResponse[]) => {
            const moviesWithProviders: Movie[] = movies.map((movie, index) => {
              const providers = providersArray[index];
              const providersForSingleMovie: Provider[] = providers
                .results
                ?.['HU']
                ?.flatrate || [];
              return {...movie, providers: providersForSingleMovie};
            });
            setMoviesToShow(moviesWithProviders);
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
      <Title/>
      <MovieFilter {...movieFilterProps} />
      <MoviesTable movies={moviesToShow} isLoading={isLoading} emptySearch={emptySearch }/>
      {!emptySearch &&
          <Footer totalPages={totalPages} filterParams={filterParams}/>
      }
    </Container>
  );
};

export default App;
