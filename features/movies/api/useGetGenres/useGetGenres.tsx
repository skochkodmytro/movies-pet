import { useQuery } from "@tanstack/react-query";

import { ApiError, ApiResponse, ApiServiceError } from "@/libs/api";
import { QueryOptions } from "@/libs/reactQuery";

import { requestGenres, GenresResponseDto } from "./getGenres.request";

const useGetGenres = (
  options?: QueryOptions<
    ApiResponse<GenresResponseDto>,
    ApiServiceError<ApiError>
  >
) => {
  const { data, ...rest } = useQuery({
    queryKey: ["genres", "movie"],
    queryFn: requestGenres,
    ...options,
  });

  return { genres: data?.genres, ...rest };
};

export default useGetGenres;
