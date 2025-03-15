import { PaginationResponse, instance } from "@/libs/api";

import { Movie, RequestMoviesFilterDto } from "../../types";

export const requestTopRatedMovies = async ({
  page = 1,
  sort_by = "title.asc",
  ...rest
}: RequestMoviesFilterDto): Promise<PaginationResponse<Movie>> => {
  return await instance.get("discover/movie", {
    params: {
      page,
      sort_by: "title.asc",
      ...rest,
    },
  });
};
