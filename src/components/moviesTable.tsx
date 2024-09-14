import React, {useState} from "react";
import { Table } from 'react-bootstrap';
import { TableLoading } from 'react-bootstrap-table-loading';
import { Movie } from "../interfaces/movieInterfaces";
import MovieDetailModal from "./movieDetailModal";

interface MoviesTableProps {
  movies: Movie[];
  isLoading: boolean;
}

const MoviesTable: React.FC<MoviesTableProps> = ({ movies, isLoading }) => {
  const [show, setShow] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleClose = () => setShow(false);
  const handleShow = (movie: Movie) => () => {
    setSelectedMovie(movie);
    setShow(true);
  }

  return (
    <div>
      <Table hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Year</th>
            <th>Rating</th>
            <th>Streaming</th>
          </tr>
        </thead>
        {isLoading? (
          <TableLoading
            columns={4}
            lines={5}
          />
        ) : (
          <tbody>
            {movies.map((movie: Movie) => (
              <tr key={movie.id} onClick={handleShow(movie)} role="button">
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
        )}
      </Table>

      <>
        <MovieDetailModal show={show} handleClose={handleClose} movie={selectedMovie} />
      </>
    </div>
  );
}

export default MoviesTable;
