const addMovieToRadarr = async (tmdbId: number, title: string) => {
  const baseUrl = localStorage.getItem("radarrUrl");
  const apiKey = localStorage.getItem("radarrApiKey");

  const rootFolderUrl = `${baseUrl}/api/v3/rootfolder?apiKey=${apiKey}`;
  const rootFolderResponse = await fetch(rootFolderUrl);

  if (!rootFolderResponse.ok) {
    throw new Error('Failed to fetch root folder information');
  }

  const rootFolders = await rootFolderResponse.json();

  const rootFolder = rootFolders.find((folder: any) => folder.accessible) || rootFolders[0];

  if (!rootFolder) {
    throw new Error('No root folder found');
  }

  const url = `${baseUrl}/api/v3/movie?apiKey=${apiKey}`;
  const body = {
    "tmdbId": tmdbId,
    "title": title,
    "monitored": true,
    "qualityProfileId": 4,
    "minimumAvailability": "released",
    "addOptions": {
      "searchForMovie": true
    },
    "rootFolderPath": rootFolder.path
  };

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
};

export default addMovieToRadarr;
