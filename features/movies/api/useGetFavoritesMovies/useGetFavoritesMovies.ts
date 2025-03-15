import { useState } from "react";
import { useQueries } from "@tanstack/react-query";

import { ApiError, ApiResponse, ApiServiceError } from "@/libs/api";
import { QueryOptions } from "@/libs/reactQuery";
import { MovieDetailed, requestMovieById } from "@/features/movie-details";

import { useFavoritesMoviesContext } from "@/providers/FavoritesContext";

const PAGE_SIZE = 10;

const useGetFavoritesMovies = (
  options?: QueryOptions<ApiResponse<MovieDetailed>, ApiServiceError<ApiError>>
) => {
  const [page, setPage] = useState(1);

  const {
    favoritesMoviesIds,
    isLoading: isLoadingFavoritesMoviesIds,
    removeMovieFromFavorite,
  } = useFavoritesMoviesContext();

  const paginatedIds = favoritesMoviesIds.slice(0, PAGE_SIZE * page);

  const movieQueries = useQueries({
    queries: paginatedIds.map((id) => ({
      queryKey: ["movie", "favorites", id],
      queryFn: () => requestMovieById(id),
      enabled: !isLoadingFavoritesMoviesIds,
      ...options,
    })),
  });

  const fetchMore = () => {
    setPage(page + 1);
  };

  const refetchMovies = () => {
    movieQueries.forEach((query) => query.refetch());
  };

  const movies = movieQueries
    .map((query) => query.data)
    .filter((movie) => !!movie) as MovieDetailed[];

  const isLoading =
    movieQueries.some((query) => query.isLoading) ||
    isLoadingFavoritesMoviesIds;

  const isError = movieQueries.some((query) => query.isError);
  const error = movieQueries.find((query) => query.error);
  const canFetchMore =
    favoritesMoviesIds.length !== movieQueries.length &&
    !isLoadingFavoritesMoviesIds;

  return {
    movies,
    isLoading,
    isError,
    error,
    canFetchMore,
    fetchMore,
    refetchMovies,
    removeMovieFromFavorite,
  };
};

export default useGetFavoritesMovies;
