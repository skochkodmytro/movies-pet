import { Person } from "@/features/persons";
import { instance } from "@/libs/api";

export type GetMovieByIdResponse = {
  id: number;
  cast: Person[];
  crew: Person[];
};

export const requestMovieCast = async (
  id: number
): Promise<GetMovieByIdResponse> => {
  return await instance.get(`movie/${id}/credits`);
};
