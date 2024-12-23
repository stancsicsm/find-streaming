export const isConfigured = () => {
  return localStorage.getItem('radarrApiKey')
    && localStorage.getItem('tmdbApiKey')
    && localStorage.getItem('radarrUrl');
};
