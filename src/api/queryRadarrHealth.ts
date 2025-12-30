import { getConfig } from '../utils';

const queryRadarrHealth = (apiKey?: string, url?: string) => {
  const radarrUrl = url ?? getConfig('radarrUrl');
  const radarrApiKey = apiKey ?? getConfig('radarrApiKey');

  const urlToUse = `${radarrUrl}/api/v3/health?apiKey=${radarrApiKey}`;
  return fetch(urlToUse);
};

export default queryRadarrHealth;
