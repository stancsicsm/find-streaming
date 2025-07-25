export const isConfigured = () => {
  return localStorage.getItem('radarrApiKey')
    && localStorage.getItem('tmdbApiKey')
    && localStorage.getItem('radarrUrl');
};

export const getTmdbOptions = () => ({
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${localStorage.getItem("tmdbApiKey")}`,
  },
});
