import { PaginationResponse, instance } from "@/libs/api";

import { Movie } from "../../types";

export const requestMoviesByTitle = async (
  query: string,
  page: number
): Promise<PaginationResponse<Movie>> => {
  return await instance.get("search/movie", {
    params: {
      page,
      query,
    },
  });
};
