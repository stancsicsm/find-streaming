export const isConfigured = () => {
  return (
    localStorage.getItem('radarrApiKey') &&
    localStorage.getItem('tmdbApiKey') &&
    localStorage.getItem('radarrUrl')
  );
};

export const getTmdbOptions = (apiKey?: string) => ({
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${apiKey ?? localStorage.getItem('tmdbApiKey')}`,
  },
});
