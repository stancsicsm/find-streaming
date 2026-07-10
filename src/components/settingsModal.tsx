import { CircleCheck, CircleX } from 'lucide-react';
import type React from 'react';
import { useEffect, useId, useState } from 'react';
import queryCountries from '../api/queryCountries';
import queryRadarrHealth from '../api/queryRadarrHealth';
import queryTmdbHealth from '../api/queryTmdbHealth';
import type { Country } from '../interfaces/countryInterface';
import { getConfig } from '../utils';
import Modal from './modal';

interface settingsModalProps {
  show: boolean;
  handleClose: () => void;
}

const HealthStatus: React.FC<{ available: boolean; name: string }> = ({ available, name }) => (
  <div
    className={`flex items-center gap-2 text-sm ${available ? 'text-emerald-500' : 'text-red-400'}`}
  >
    {available ? <CircleCheck size={14} /> : <CircleX size={14} />}
    <span>
      {name} is {available ? 'available' : 'not available'}
    </span>
  </div>
);

const SettingsModal: React.FC<settingsModalProps> = ({ show, handleClose }) => {
  const [radarrUrl, setRadarrUrl] = useState<string>(getConfig('radarrUrl') || '');
  const [radarrApiKey, setRadarrApiKey] = useState<string>(getConfig('radarrApiKey') || '');
  const [tmdbApiKey, setTmdbApiKey] = useState<string>(getConfig('tmdbApiKey') || '');
  const [countryOptions, setCountryOptions] = useState<Country[]>([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState(getConfig('country') || '');
  const [radarrAvailable, setRadarrAvailable] = useState<null | boolean>(null);
  const [tmdbAvailable, setTmdbAvailable] = useState<null | boolean>(null);
  const fieldId = useId();

  useEffect(() => {
    queryCountries()
      .then((countries) => {
        setCountryOptions(countries);
      })
      .catch((error) => {
        console.error('Error fetching countries:', error);
      });
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: show is a deliberate trigger to reset health checks when the modal opens/closes
  useEffect(() => {
    setRadarrAvailable(null);
    setTmdbAvailable(null);
  }, [show]);

  const handleSave = () => {
    const cleanedUrl = radarrUrl.replace(/\/+$/, '');
    setRadarrUrl(cleanedUrl);
    localStorage.setItem('radarrUrl', cleanedUrl);
    localStorage.setItem('radarrApiKey', radarrApiKey);
    localStorage.setItem('tmdbApiKey', tmdbApiKey);
    localStorage.setItem('country', selectedCountryCode);
  };

  const handleTestConnection = () => {
    queryRadarrHealth(radarrApiKey, radarrUrl)
      .then((response) => {
        setRadarrAvailable(response.ok);
      })
      .catch(() => {
        setRadarrAvailable(false);
      });

    queryTmdbHealth(tmdbApiKey)
      .then((response) => {
        setTmdbAvailable(response.ok);
      })
      .catch(() => {
        setTmdbAvailable(false);
      });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
      handleClose();
    }
  };

  const fields = [
    {
      label: 'Radarr URL',
      type: 'text',
      value: radarrUrl,
      onChange: setRadarrUrl,
    },
    {
      label: 'Radarr API Key',
      type: 'password',
      value: radarrApiKey,
      onChange: setRadarrApiKey,
    },
    {
      label: 'TMDB API Key',
      type: 'password',
      value: tmdbApiKey,
      onChange: setTmdbApiKey,
    },
  ];

  return (
    <Modal
      show={show}
      onClose={handleClose}
      title="Settings"
      footer={
        <>
          <button type="button" className="btn btn-ghost" onClick={handleTestConnection}>
            Test
          </button>
          <button type="button" className="btn btn-ghost ml-auto" onClick={handleClose}>
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              handleSave();
              handleClose();
            }}
          >
            Save
          </button>
        </>
      }
    >
      <div className="space-y-4">
        {fields.map((field) => (
          <div key={field.label}>
            <label
              htmlFor={`${fieldId}-${field.label}`}
              className="mb-1.5 block text-sm font-medium text-muted"
            >
              {field.label}
            </label>
            <input
              id={`${fieldId}-${field.label}`}
              type={field.type}
              className="input"
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
        ))}
        <div>
          <label
            htmlFor={`${fieldId}-country`}
            className="mb-1.5 block text-sm font-medium text-muted"
          >
            Streaming region
          </label>
          <select
            id={`${fieldId}-country`}
            className="input appearance-none"
            value={selectedCountryCode}
            onChange={(e) => setSelectedCountryCode(e.target.value)}
          >
            <option value="">Select a country</option>
            {countryOptions.map((country) => (
              <option key={country.iso_3166_1} value={country.iso_3166_1}>
                {country.english_name}
              </option>
            ))}
          </select>
        </div>
        {radarrAvailable !== null && <HealthStatus available={radarrAvailable} name="Radarr" />}
        {tmdbAvailable !== null && <HealthStatus available={tmdbAvailable} name="TMDB" />}
      </div>
    </Modal>
  );
};

export default SettingsModal;
