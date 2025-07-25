const queryRadarrHealth = () => {
  const url = `${localStorage.getItem("radarrUrl")}/api/v3/health?apiKey=${localStorage.getItem("radarrApiKey")}`;
  return fetch(url);
};

export default queryRadarrHealth;

