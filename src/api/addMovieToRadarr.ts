const addMovieToRadarr = (tmdbId: number, title: string) => {
  const url = `http://pi.local:7878/api/v3/movie?apiKey=${process.env.REACT_APP_RADARR_API_KEY}`;
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
