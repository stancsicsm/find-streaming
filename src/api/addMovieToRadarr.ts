const addMovieToRadarr = (tmdbId: number, title: string) => {
  const url = `${localStorage.getItem("radarrUrl")}/api/v3/movie?apiKey=${localStorage.getItem("radarrApiKey")}`;
  const body = {
    "tmdbId": tmdbId,
    "title": title,
    "monitored": true,
    "qualityProfileId": 4,
    "minimumAvailability": "released",
    "addOptions": {
      "searchForMovie": true
    },
    "rootFolderPath": "/movies/movies"
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
