import { RadarrMovie } from '../interfaces/movieInterfaces';

const queryRadarrMovies = (): Promise<RadarrMovie[]> => {
  const radarrUrl = localStorage.getItem('radarrUrl');
  const radarrApiKey = localStorage.getItem('radarrApiKey');

  if (!radarrUrl || !radarrApiKey) {
    return Promise.resolve([]);
  }

  const urlToUse = `${radarrUrl}/api/v3/movie?apiKey=${radarrApiKey}`;
  return fetch(urlToUse)
    .then((response) => response.json())
    .then((response) => response as RadarrMovie[])
    .catch(() => {
      return [];
    });
};

export default queryRadarrMovies;
