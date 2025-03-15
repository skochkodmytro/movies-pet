export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Genre {
  name: string;
  id: number;
}

export enum SearchMovieBy {
  Title = 1,
  Actor = 2,
}

export type MoviesFilter = {
  with_genres?: number[];
  "vote_average.gte"?: number;
  "vote_average.lte"?: number;
};

export type RequestMoviesFilterDto = {
  certification?: string;
  certification_gte?: string;
  certification_lte?: string;
  certification_country?: string;
  include_adult?: boolean;
  include_video?: boolean;
  language?: string;
  page?: number;
  primary_release_year?: number;
  primary_release_date_gte?: string;
  primary_release_date_lte?: string;
  region?: string;
  release_date_gte?: string;
  release_date_lte?: string;
  sort_by?: string;
  "vote_average.gte"?: number;
  "vote_average.lte"?: number;
  watch_region?: string;
  with_cast?: string;
  with_companies?: string;
  with_crew?: string;
  with_genres?: string;
  with_keywords?: string;
  with_origin_country?: string;
  with_original_language?: string;
  with_people?: string;
  with_release_type?: number | string; // Can be a comma or pipe-separated query
  with_runtime_gte?: number;
  with_runtime_lte?: number;
  with_watch_monetization_types?: string; // Possible values: [flatrate, free, ads, rent, buy]
  with_watch_providers?: string;
  without_companies?: string;
  without_genres?: string;
  without_keywords?: string;
  without_watch_providers?: string;
  year?: number;
};
