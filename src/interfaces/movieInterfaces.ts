interface Movie {
  id: number;
  title: string;
  overview: string;
  vote_average: number;
  release_date: string;
  genre_ids: number[];
  backdrop_path: string;
  providers?: {
    logo_path: string;
    provider_id: number;
    provider_name: string;
  }[];
}

interface Movies {
  page: number;
  results: Movie[];
}

export type { Movie, Movies };
