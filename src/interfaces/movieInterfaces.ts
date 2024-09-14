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
}

interface Movies {
  page: number;
  results: Movie[];
}

export type { Movie, Movies };
