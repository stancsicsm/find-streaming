declare global {
  interface Window {
    ENV_CONFIG?: {
      RADARR_API_KEY: string;
      TMDB_API_KEY: string;
      RADARR_URL: string;
      COUNTRY_CODE: string;
    };
  }
}

export const getConfig = (config: 'radarrApiKey' | 'tmdbApiKey' | 'radarrUrl' | 'country') => {
  const runtimeConfig = window.ENV_CONFIG;

  switch (config) {
    case 'radarrApiKey':
      return (
        localStorage.getItem('radarrApiKey') ||
        runtimeConfig?.RADARR_API_KEY ||
        process.env.REACT_APP_RADARR_API_KEY
      );
    case 'tmdbApiKey':
      return (
        localStorage.getItem('tmdbApiKey') ||
        runtimeConfig?.TMDB_API_KEY ||
        process.env.REACT_APP_TMDB_API_KEY
      );
    case 'radarrUrl':
      return (
        localStorage.getItem('radarrUrl') ||
        runtimeConfig?.RADARR_URL ||
        process.env.REACT_APP_RADARR_URL
      );
    case 'country':
      return (
        localStorage.getItem('country') ||
        runtimeConfig?.COUNTRY_CODE ||
        process.env.REACT_APP_COUNTRY_CODE
      );
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
