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
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id}>
              <td>{movie.title}</td>
              <td>{movie.release_date}</td>
              <td>{movie.vote_average}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MoviesTable;
