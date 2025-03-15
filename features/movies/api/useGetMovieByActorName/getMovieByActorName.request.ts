import { PaginationResponse, instance } from "@/libs/api";

import { requestPersonByName } from "@/features/persons";

import { Movie } from "../../types";

export const requestMoviesByActorName = async (
  query: string,
  page: number
): Promise<PaginationResponse<Movie>> => {
  const { results } = await requestPersonByName(1, query);

  return await instance.get("discover/movie", {
    params: {
      page,
      query,
      with_people: results.map((person) => person.id).join("|"),
    },
  });
};
