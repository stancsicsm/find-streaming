import React, {useState} from "react";
import {Button, Modal} from 'react-bootstrap';

import {Movie} from "../interfaces/movieInterfaces";

import queryTrailers from "../api/queryTrailers";

interface MovieDetailModalProps {
  show: boolean;
  handleClose: () => void;
  movie: Movie | null;
}

const MovieDetailModal: React.FC<MovieDetailModalProps> = ({ show, handleClose, movie }) => {
  const [trailerKey, setTrailerKey] = useState<string | null>(null);

  if (!movie) {
    return null;
  }

  const trailerPromise = queryTrailers(movie.id);
  trailerPromise.then((trailerResponse) => {
    const trailers = trailerResponse.results
    const trailerKey: string = trailers
      .filter((trailer) => trailer.official && trailer.type === 'Trailer' && trailer.site === 'YouTube')
      .sort((a, b) => Date.parse(b.published_at) - Date.parse(a.published_at))
      .slice(0, 1)
      .map((trailer) => trailer.key)[0];
    setTrailerKey(trailerKey);
  })

  const handleAddToRadarr = () => {
    console.log(movie.id)
  }

  return (
    <Modal show={show} onHide={handleClose} scrollable={true}>
      <Modal.Header closeButton>
        <Modal.Title>{`${movie.title} (${movie.release_date.split('-')[0]})`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {movie.backdrop_path && (
          <img
            src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
            alt={movie.title}
            className="img-fluid mb-3"
          />
        )}
        <h5>Description</h5>
        <p>{movie.overview}</p>
        <h5>Rating</h5>
        <p>{movie.vote_average.toFixed(1)} / 10</p>
        {movie.providers.length > 0 && (
          <>
            <h5>Streaming Platforms</h5>
            {movie.providers.map((provider) => (
              <p key={provider.logo_path}>
                <img
                  alt={provider.provider_name}
                  className="provider-logo me-2 rounded-circle"
                  src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                  width={30}
                  height={30}
                />
                {provider.provider_name}
              </p>
            ))}
          </>
        )}
        {trailerKey && (
          <>
            <h5>Trailer</h5>
            <iframe
              key={trailerKey}
              width="100%"
              height="250"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title={movie.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button className="rounded-pill disabled" variant="primary" onClick={handleAddToRadarr}>
          Add to Radarr
        </Button>
        <Button className="rounded-pill ms-auto" variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>

  )
}

export default MovieDetailModal;
