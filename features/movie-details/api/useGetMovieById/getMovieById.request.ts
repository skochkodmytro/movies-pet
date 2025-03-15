import { instance } from "@/libs/api";

import { MovieDetailed } from "../../types";

export const requestMovieById = async (id: number): Promise<MovieDetailed> => {
  return await instance.get(`movie/${id}`);
};
