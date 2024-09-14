import React from "react";
import {Movie} from "../interfaces/movieInterfaces";
import { Button, Modal} from 'react-bootstrap';

interface MovieDetailModalProps {
  show: boolean;
  handleClose: () => void;
  movie: Movie | null;
}

const MovieDetailModal: React.FC<MovieDetailModalProps> = ({ show, handleClose, movie }) => {
  if (!movie) {
    return null;
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{`${movie.title} (${movie.release_date.split('-')[0]})`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
          alt={movie.title}
          className="img-fluid mb-3"
        />
        <p>{movie.overview}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default MovieDetailModal;