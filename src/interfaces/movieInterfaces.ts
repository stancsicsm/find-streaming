import { Provider } from './providerInterfaces';

interface Movie {
  id: number;
  title: string;
  overview: string;
  vote_average: number;
  release_date?: string;
  genre_ids: number[];
  backdrop_path: string;
  providers: Provider[];
}

interface MoviesResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}

interface RadarrMovie {
  id: number;
  tmdbId: number;
}

export type { Movie, MoviesResponse, RadarrMovie };
