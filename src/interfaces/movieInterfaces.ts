import {Provider} from "./providerInterfaces";

interface Movie {
  id: number;
  title: string;
  overview: string;
  vote_average: number;
  release_date: string;
  genre_ids: number[];
  backdrop_path: string;
  providers: Provider[];
  trailerKey?: string;
}

interface MoviesResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}

export type { Movie, MoviesResponse }
