export const getConfig = (config: 'radarrApiKey' | 'tmdbApiKey' | 'radarrUrl' | 'country') => {
  switch (config) {
    case 'radarrApiKey':
      return localStorage.getItem('radarrApiKey') || process.env.REACT_APP_RADARR_API_KEY;
    case 'tmdbApiKey':
      return localStorage.getItem('tmdbApiKey') || process.env.REACT_APP_TMDB_API_KEY;
    case 'radarrUrl':
      return localStorage.getItem('radarrUrl') || process.env.REACT_APP_RADARR_URL;
    case 'country':
      return localStorage.getItem('country') || process.env.REACT_APP_COUNTRY_CODE;
    default:
      return null;
  }
};

export const isConfigured = () =>
  getConfig('radarrApiKey') && getConfig('tmdbApiKey') && getConfig('radarrUrl');

export const getTmdbOptions = (apiKey?: string) => ({
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${apiKey ?? getConfig('tmdbApiKey')}`,
  },
});
