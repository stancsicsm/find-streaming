import React from "react";
import { Movie } from "../interfaces/movieInterfaces";

interface MoviesTableProps {
  movies: Movie[];
}

const MoviesTable: React.FC<MoviesTableProps> = ({ movies }) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Year</th>
            <th>Rating</th>
            <th>Streaming</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
              <tr key={movie.id}>
                <td>{movie.title}</td>
                <td>{movie.release_date}</td>
                <td>{movie.vote_average}</td>
                <td>
                  {movie?.providers?.map((provider) => (
                      <img
                          key={provider.logo_path}
                          alt="provider"
                          className="provider-logo me-2 rounded-circle"
                          src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                          width={30}
                          height={30}
                      />
                  )) ?? null}
                </td>
              </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MoviesTable;
