import React, {useState} from "react";
import {Row, Col, Table} from 'react-bootstrap';

import {Movie} from "../interfaces/movieInterfaces";

import MovieDetailModal from "./movieDetailModal";

import {TableLoading} from 'react-bootstrap-table-loading';

interface MoviesTableProps {
  movies: Movie[];
  isLoading: boolean;
  emptySearch: boolean;
}

const MoviesTable: React.FC<MoviesTableProps> = ({ movies, isLoading, emptySearch }) => {
  const [show, setShow] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleClose = () => setShow(false);
  const handleShow = (movie: Movie) => () => {
    setSelectedMovie(movie);
    setShow(true);
  }

  if (emptySearch) {
    return (
      <Row className="justify-content-md-center">
        <Col>
          <Table>
            <thead>
            <tr>
              <th>Title</th>
              <th>Year</th>
              <th>Rating</th>
              <th>Streaming</th>
            </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={4} className="text-center">Search for a movie</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    )
  }

  return (
    <Row className="justify-content-md-center mb-2">
      <Col>
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
                <td>{movie.release_date.split("-")[0]}</td>
                <td className="text-center">{movie.vote_average.toFixed(1)}</td>
                <td className="text-center">
                  {movie?.providers?.map((provider) => (
                    <img
                      key={provider.logo_path}
                      alt={provider.provider_name}
                      className="provider-logo me-2 rounded-circle"
                      src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                      width={30}
                      height={30}
                    />
                  ))}
                </td>
              </tr>
            ))}
            </tbody>
          )}
        </Table>
        <MovieDetailModal
          show={show}
          handleClose={handleClose}
          movie={selectedMovie}
        />
      </Col>
    </Row>
  );
}

export default MoviesTable;
