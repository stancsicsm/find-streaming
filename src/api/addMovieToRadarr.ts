import queryRootFolder from './queryRootFolder';
import { RootFolder } from '../interfaces/rootFolderInterface';

const addMovieToRadarr = async (tmdbId: number, title: string) => {
  const rootFolderResponse = await queryRootFolder();
  if (!rootFolderResponse.ok) {
    throw new Error('Failed to fetch root folder information');
  }

  const rootFolders: RootFolder[] = await rootFolderResponse.json();
  const accessibleFolder = rootFolders.find((folder) => folder.accessible);

  if (!accessibleFolder) {
    throw new Error('No accessible root folder found');
  }

  const radarrUrl = localStorage.getItem('radarrUrl');
  const radarrApiKey = localStorage.getItem('radarrApiKey');

  const url = `${radarrUrl}/api/v3/movie?apiKey=${radarrApiKey}`;
  const body = {
    tmdbId: tmdbId,
    title: title,
    monitored: true,
    qualityProfileId: 4,
    minimumAvailability: 'released',
    addOptions: {
      searchForMovie: true,
    },
    rootFolderPath: accessibleFolder.path,
  };

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
};

export default addMovieToRadarr;
