import { useQuery } from "@tanstack/react-query";

import { ApiError, ApiResponse, ApiServiceError } from "@/libs/api";
import { QueryOptions } from "@/libs/reactQuery";

import { requestMovieCast, GetMovieByIdResponse } from "./getMovieCast.request";

const useGetMovieCast = (
  id: number,
  options?: QueryOptions<
    ApiResponse<GetMovieByIdResponse>,
    ApiServiceError<ApiError>
  >
) => {
  const { data, ...rest } = useQuery({
    queryKey: ["movie", id, "credits"],
    queryFn: () => requestMovieCast(id),
    ...options,
  });

  return { data, ...rest };
};

export default useGetMovieCast;
