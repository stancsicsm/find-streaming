const queryRadarrHealth = (apiKey?: string, url?: string) => {
  const radarrUrl = url ?? localStorage.getItem('radarrUrl');
  const radarrApiKey = apiKey ?? localStorage.getItem('radarrApiKey');

  const urlToUse = `${radarrUrl}/api/v3/health?apiKey=${radarrApiKey}`;
  return fetch(urlToUse);
};

export default queryRadarrHealth;
