interface Genre {
  id: number;
  name: string;
}

interface Genres {
  genres: Genre[];
}

export type { Genres, Genre };
