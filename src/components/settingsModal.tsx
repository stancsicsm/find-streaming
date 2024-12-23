import {Button, Modal, Form} from "react-bootstrap";
import React, {useState} from "react";

interface settingsModalProps {
  show: boolean;
  handleClose: () => void;
}

const SettingsModal: React.FC<settingsModalProps> = ({show, handleClose}) => {
  const [radarrUrl, setRadarrUrl] = useState(() => {
    const storedRadarrUrl = localStorage.getItem("radarrUrl");
    return storedRadarrUrl || "http://pi.local:7878";
  });
  const [radarrApiKey, setRadarrApiKey] = useState(() => {
    const storedRadarrApiKey = localStorage.getItem("radarrApiKey");
    return storedRadarrApiKey || "";
  });
  const [tmdbApiKey, setTmdbApiKey] = useState(() => {
    const storedTmdbApiKey = localStorage.getItem("tmdbApiKey");
    return storedTmdbApiKey || "";
  });

  const handleSave = () => {
    setRadarrUrl(radarrUrl.replace(/\/+$/, ''));
    localStorage.setItem("radarrUrl", radarrUrl);
    localStorage.setItem("radarrApiKey", radarrApiKey);
    localStorage.setItem("tmdbApiKey", tmdbApiKey);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="radarUrl  Key">
            <Form.Label>Radarr URL</Form.Label>
            <Form.Control
              type="text"
              className="rounded-pill focus-ring focus-ring-secondary border"
              value={radarrUrl}
              onChange={(e) => setRadarrUrl(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="radarrApiKey">
            <Form.Label>Radarr API Key</Form.Label>
            <Form.Control
              type="password"
              className="rounded-pill focus-ring focus-ring-secondary border"
              value={radarrApiKey}
              onChange={(e) => setRadarrApiKey(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="tmdbApiKey">
            <Form.Label>TMDB API Key</Form.Label>
            <Form.Control
              type="password"
              className="rounded-pill focus-ring focus-ring-secondary border"
              value={tmdbApiKey}
              onChange={(e) => setTmdbApiKey(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className="rounded-pill" variant="primary" onClick={() => {
          handleSave();
          handleClose();
        }}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SettingsModal;
