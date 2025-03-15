import { PaginationResponse, instance } from "@/libs/api";

import { Person } from "../../types";

export const requestPersonByName = async (
  page: number = 1,
  query: string
): Promise<PaginationResponse<Person>> => {
  return await instance.get("search/person", {
    params: {
      page,
      query,
    },
  });
};
