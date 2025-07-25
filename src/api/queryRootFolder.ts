const queryRootFolder = (apiKey?: string, url?: string) => {
  const radarrUrl = url ?? localStorage.getItem("radarrUrl");
  const radarrApiKey = apiKey ?? localStorage.getItem("radarrApiKey");

  const urlToUse = `${radarrUrl}/api/v3/rootfolder?apiKey=${radarrApiKey}`;
  return fetch(urlToUse);
};

export default queryRootFolder;
