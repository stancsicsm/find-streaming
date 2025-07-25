import {Button, Modal, Form} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {Typeahead} from 'react-bootstrap-typeahead';
import {Option} from "react-bootstrap-typeahead/types/types";
import {CheckCircleFill, XCircleFill} from 'react-bootstrap-icons';

import {Country} from "../interfaces/countryInterface";

import queryCountries from "../api/queryCountries";
import queryRadarrHealth from '../api/queryRadarrHealth';
import queryTmdbHealth from '../api/queryTmdbHealth';

import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead.bs5.css';

interface settingsModalProps {
  show: boolean;
  handleClose: () => void;
}

const SettingsModal: React.FC<settingsModalProps> = ({show, handleClose}) => {
  const [radarrUrl, setRadarrUrl] = useState<string>(() => {
    const storedRadarrUrl = localStorage.getItem("radarrUrl");
    return storedRadarrUrl || "";
  });
  const [radarrApiKey, setRadarrApiKey] = useState<string>(() => {
    const storedRadarrApiKey = localStorage.getItem("radarrApiKey");
    return storedRadarrApiKey || "";
  });
  const [tmdbApiKey, setTmdbApiKey] = useState<string>(() => {
    const storedTmdbApiKey = localStorage.getItem("tmdbApiKey");
    return storedTmdbApiKey || "";
  });
  const [countryOptions, setCountryOptions] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedCountryCode, setSelectedCountryCode] = useState(() => {
    const storedCountryCode = localStorage.getItem("country");
    return storedCountryCode || "HU";
  });
  const [radarrAvailable, setRadarrAvailable] = useState<null | boolean>(null);
  const [tmdbAvailable, setTmdbAvailable] = useState<null | boolean>(null);

  useEffect(() => {
    queryCountries()
      .then((countries) => {
        setCountryOptions(countries);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  useEffect(() => {
    const selectedCountry = countryOptions.find((country) => country.iso_3166_1 === selectedCountryCode);
    setSelectedCountry(selectedCountry ?? null);
  }, [countryOptions, selectedCountryCode]);

  useEffect(() => {
    setRadarrAvailable(null);
    setTmdbAvailable(null);
  }, [show]);

  const handleSave = () => {
    const cleanedUrl = radarrUrl.replace(/\/+$/, '');
    setRadarrUrl(cleanedUrl);
    localStorage.setItem("radarrUrl", cleanedUrl);
    localStorage.setItem("radarrApiKey", radarrApiKey);
    localStorage.setItem("tmdbApiKey", tmdbApiKey);
    localStorage.setItem("country", selectedCountryCode);
  };

  const handleTestConnection = () => {
    queryRadarrHealth(radarrApiKey, radarrUrl)
      .then(response => {
        if (response.ok) {
          setRadarrAvailable(true);
        } else {
          setRadarrAvailable(false);
        }
      })
      .catch(() => {
        setRadarrAvailable(false);
      });

    queryTmdbHealth(tmdbApiKey)
      .then(response => {
        if (response.ok) {
          setTmdbAvailable(true);
        } else {
          setTmdbAvailable(false);
        }
      })
      .catch(() => {
        setTmdbAvailable(false);
      });
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
      handleClose();
    }
  };

  const handleSelectCountry = (selected: Option[]) => {
    if (selected.length > 0) {
      const selectedOption = selected[0];
      if (typeof selectedOption === 'object' && 'iso_3166_1' in selectedOption) {
        setSelectedCountryCode(selectedOption.iso_3166_1);
      }
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
          <Form.Group className="mb-3" controlId="countrySelector">
            <Form.Label>Streaming region</Form.Label>
            <Typeahead
              id="countrySelector"
              labelKey="english_name"
              onChange={handleSelectCountry}
              options={countryOptions}
              defaultSelected={selectedCountry ? [selectedCountry] : []}
              clearButton
              inputProps={{
                className: "rounded-pill focus-ring focus-ring-secondary border",
              }}
            />
          </Form.Group>
        </Form>

        {radarrAvailable !== null && (
          <div className={`d-flex align-items-center ${radarrAvailable ? "text-success" : "text-danger"}`}>
            {radarrAvailable ? (
              <>
                <CheckCircleFill className="me-2"/>
                <span>Radarr is available</span>
              </>
            ) : (
              <>
                <XCircleFill className="me-2"/>
                <span>Radarr is not available</span>
              </>
            )}
          </div>
        )}
        {tmdbAvailable !== null && (
          <div className={`d-flex align-items-center ${tmdbAvailable ? "text-success" : "text-danger"}`}>
            {tmdbAvailable ? (
              <>
                <CheckCircleFill className="me-2"/>
                <span>TMDB is available</span>
              </>
            ) : (
              <>
                <XCircleFill className="me-2"/>
                <span>TMDB is not available</span>
              </>
            )}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Button className="rounded-pill ms-2" variant="outline-secondary" onClick={handleTestConnection}>
          Test Connection
        </Button>
        <Button className="rounded-pill ms-2" variant="primary" onClick={() => {
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
