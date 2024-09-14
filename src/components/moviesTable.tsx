import React from "react";
import Table from 'react-bootstrap/Table';
import { Movie } from "../interfaces/movieInterfaces";

interface MoviesTableProps {
  movies: Movie[];
}

const MoviesTable: React.FC<MoviesTableProps> = ({ movies }) => {
  return (
    <Table hover>
      <thead>
        <tr>
          <th>Title</th>
          <th>Year</th>
          <th>Rating</th>
          <th>Streaming</th>
        </tr>
      </thead>
      <tbody>
        {movies.map((movie: Movie) => (
          <tr key={movie.id}>
            <td>{movie.title}</td>
            <td>{movie.release_date.split('-')[0]}</td>
            <td>{movie.vote_average.toFixed(1)}</td>
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
    </Table>
  );
}

export default MoviesTable;
