import { useInfiniteQuery } from "@tanstack/react-query";

import { requestTopRatedMovies } from "./getTopRatedMovies.request";

import { Movie, RequestMoviesFilterDto } from "../../types";

const useGetTopRatedMovies = (filter: RequestMoviesFilterDto) => {
  const { data, ...rest } = useInfiniteQuery({
    queryKey: ["movies", "top-rated", filter],
    queryFn: ({ pageParam = 1 }) =>
      requestTopRatedMovies({ page: pageParam, ...filter }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.page + 1,
  });

  const moviesArr = data?.pages.reduce((acc, page) => {
    return [...acc, ...page.results];
  }, [] as Movie[]);

  return {
    data: moviesArr,
    ...rest,
  };
};

export default useGetTopRatedMovies;
