import { useQuery } from "@tanstack/react-query";

import { ApiError, ApiResponse, ApiServiceError } from "@/libs/api";
import { QueryOptions } from "@/libs/reactQuery";

import { requestMovieById } from "./getMovieById.request";
import { MovieDetailed } from "../../types";

const useGetMovieById = (
  id: number,
  options?: QueryOptions<ApiResponse<MovieDetailed>, ApiServiceError<ApiError>>
) => {
  const { data, ...rest } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => requestMovieById(id),
    ...options,
  });

  return { movie: data, ...rest };
};

export default useGetMovieById;
