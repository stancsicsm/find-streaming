import React, { useState, useEffect } from "react";
import queryMovies from "./api/queryMovies";
import MoviesTable from "./components/moviesTable";
import { Movie } from "./interfaces/movieInterfaces";

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    queryMovies()
      .then((movies) => {
        setMovies(movies);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, []);

  return (
    <div>
      <h1>Top Movies</h1>
      <MoviesTable movies={movies} />
    </div>
  );
};

export default App;
