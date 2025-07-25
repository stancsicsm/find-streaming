import React, {useEffect, useState} from "react";
import {Button, Modal, Alert, Spinner} from 'react-bootstrap';

import {Movie} from "../interfaces/movieInterfaces";

import queryTrailers from "../api/queryTrailers";
import addMovieToRadarr from "../api/addMovieToRadarr";

interface MovieDetailModalProps {
  show: boolean;
  handleClose: () => void;
  movie: Movie | null;
}

const MovieDetailModal: React.FC<MovieDetailModalProps> = ({show, handleClose, movie}) => {
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [radarrMessage, setRadarrMessage] = useState<{ message: string; variant: string }>({
    message: '',
    variant: ''
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setRadarrMessage({message: '', variant: ''});
  }, [show]);

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
    setIsLoading(true);
    addMovieToRadarr(movie.id, movie.title)
      .then(response => {
        if (response.status === 201) {
          setIsLoading(false);
          setRadarrMessage({
            message: `${movie.title} added to Radarr`,
            variant: 'success'
          })
          return;
        }
        return response.json();
      })
      .then(data => {
        setIsLoading(false);
        if (!data) {
          return;
        }
        if (data[0].errorCode === 'MovieExistsValidator') {
          setRadarrMessage({
            message: `${movie.title} already added to Radarr`,
            variant: 'warning'
          });
        } else {
          setRadarrMessage({
            message: `Failed to add ${movie.title} to Radarr`,
            variant: 'danger'
          });
        }
      })
      .catch(error => {
        setRadarrMessage({
          message: `Failed to add ${movie.title} to Radarr`,
          variant: 'danger'
        });
        console.error(error)
      });
  }

  return (
    <Modal show={show} onHide={handleClose} scrollable={true}>
      <Modal.Header closeButton>
        <Modal.Title>{`${movie.title} (${movie.release_date?.split('-')[0]})`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {radarrMessage.message &&
            <Alert
                variant={radarrMessage.variant}
                onClose={() => setRadarrMessage({message: '', variant: ''})}
                dismissible
            >
              {radarrMessage.message}
            </Alert>
        }

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
        <Button
          className="rounded-pill"
          variant="outline-secondary"
          onClick={handleAddToRadarr}
          disabled={isLoading}
        >
          Add to Radarr
        </Button>
        <Spinner
          className={`ms-1`}
          as="span"
          size="sm"
          variant="secondary"
          hidden={!isLoading}
        />
        <Button className="rounded-pill ms-auto" variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>

  )
}

export default MovieDetailModal;
