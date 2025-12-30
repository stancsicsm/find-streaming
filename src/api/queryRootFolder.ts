import { getConfig } from '../utils';

const queryRootFolder = () => {
  const radarrUrl = getConfig('radarrUrl');
  const radarrApiKey = getConfig('radarrApiKey');

  const url = `${radarrUrl}/api/v3/rootfolder?apiKey=${radarrApiKey}`;
  return fetch(url);
};

export default queryRootFolder;
