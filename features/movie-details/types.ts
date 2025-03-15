import { Genre, Movie } from "@/features/movies";

export interface Company {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface MovieDetailed extends Movie {
  belongs_to_collection: null | object;
  budget: number;
  genres: Genre[];
  homepage: string;
  imdb_id: string;
  origin_country: string[];
  production_companies: Company[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
}
