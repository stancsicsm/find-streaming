import React from "react";
import {Movie} from "../interfaces/movieInterfaces";
import {Genre} from "../interfaces/genreInterface";
import { Button, Modal} from 'react-bootstrap';

interface MovieDetailModalProps {
  show: boolean;
  handleClose: () => void;
  movie: Movie | null;
  genreOptions: Genre[];
}

const MovieDetailModal: React.FC<MovieDetailModalProps> = ({ show, handleClose, movie, genreOptions }) => {
  if (!movie) {
    return null;
  }

  const findGenre = (genreId: number) => {
    return genreOptions.find((genre) => genre.id === genreId)?.name;
  }

  return (
    <Modal show={show} onHide={handleClose} scrollable={true}>
      <Modal.Header closeButton>
        <Modal.Title>{`${movie.title} (${movie.release_date.split('-')[0]})`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
          alt={movie.title}
          className="img-fluid mb-3"
        />
        <h5>Description</h5>
        <p>{movie.overview}</p>
        <h5>Genres</h5>
        <p>
          {movie.genre_ids.map((genreId) => {
            return findGenre(genreId)
          }).join(", ")}
        </p>
        <h5>Rating</h5>
        <p>{movie.vote_average.toFixed(1)} / 10</p>
        <h5>Streaming Platforms</h5>
          {movie.providers.map((provider) => (
            <p>
              <img
                key={provider.logo_path}
                alt={provider.provider_name}
                className="provider-logo me-2 rounded-circle"
                src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                width={30}
                height={30}
              />
              {provider.provider_name}
            </p>
          ))}
        {movie.trailerKey && (
          <>
            <h5>Trailer</h5>
            <iframe
              key={movie.trailerKey}
              width="100%"
              height="250"
              src={`https://www.youtube.com/embed/${movie.trailerKey}`}
              title={movie.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button className="rounded-pill" variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>

  )
}

export default MovieDetailModal;