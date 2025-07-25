const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${localStorage.getItem("tmdbApiKey")}`,
  },
};

const queryTmdbHealth = () => {
  const url = "https://api.themoviedb.org/3/authentication";
  return fetch(url, options);
};

export default queryTmdbHealth;
