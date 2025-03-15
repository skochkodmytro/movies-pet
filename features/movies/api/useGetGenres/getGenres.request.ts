import { instance } from "@/libs/api";

import { Genre } from "../../types";

export type GenresResponseDto = {
  genres: Genre[];
};

export const requestGenres = async (): Promise<GenresResponseDto> => {
  return await instance.get("genre/movie/list");
};
