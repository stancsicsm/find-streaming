import { RadarrMovie } from '../interfaces/movieInterfaces';

const queryRadarrMovies = (): Promise<RadarrMovie[]> => {
  const radarrUrl = localStorage.getItem('radarrUrl');
  const radarrApiKey = localStorage.getItem('radarrApiKey');

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
