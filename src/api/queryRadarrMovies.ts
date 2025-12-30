import { RadarrMovie } from '../interfaces/movieInterfaces';
import { getConfig } from '../utils';

const queryRadarrMovies = (): Promise<RadarrMovie[]> => {
  const radarrUrl = getConfig('radarrUrl');
  const radarrApiKey = getConfig('radarrApiKey');

  const url = `${radarrUrl}/api/v3/movie?apiKey=${radarrApiKey}`;

  return fetch(url)
    .then((response) => response.json())
    .then((movies) => movies as RadarrMovie[])
    .catch((err) => {
      console.error('Error fetching Radarr movies:', err);
      return [] as RadarrMovie[];
    });
};

export default queryRadarrMovies;
