const queryRootFolder = () => {
  const radarrUrl = localStorage.getItem("radarrUrl");
  const radarrApiKey = localStorage.getItem("radarrApiKey");

  const url = `${radarrUrl}/api/v3/rootfolder?apiKey=${radarrApiKey}`;
  return fetch(url);
};

export default queryRootFolder;
