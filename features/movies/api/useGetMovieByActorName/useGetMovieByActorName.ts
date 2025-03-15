import {
  useInfiniteQuery,
  // InfiniteQueryPageParamsOptions,
  // QueryOptions,
  // UseInfiniteQueryOptions,
} from "@tanstack/react-query";

// import {
//   ApiError,
//   ApiResponse,
//   ApiServiceError,
//   PaginationResponse,
// } from "@/libs/api";

import { requestMoviesByActorName } from "./getMovieByActorName.request";
import { Movie } from "../../types";

const useGetMovieByActorName = (
  query: string,
  // options?: QueryOptions<
  //   ApiResponse<PaginationResponse<Movie>>,
  //   ApiServiceError<ApiError>
  // >
  // options?: UseInfiniteQueryOptions<ApiResponse<PaginationResponse<Movie>>>
  options?: any
) => {
  const { data, ...rest } = useInfiniteQuery({
    queryKey: ["search", "movies", "person", query],
    queryFn: ({ pageParam = 1 }) =>
      requestMoviesByActorName(query, pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.page === lastPage.total_pages
        ? undefined
        : lastPage.page + 1;
    },

    ...options,
  });

  const moviesArr = data?.pages?.reduce((acc, page) => {
    return [...acc, ...page.results];
  }, [] as Movie[]);

  return {
    data: moviesArr,
    ...rest,
  };
};

export default useGetMovieByActorName;
