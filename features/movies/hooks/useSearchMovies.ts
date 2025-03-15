import { useGetMovieByActorName, useGetMoviesByTitle } from "../api";
import { SearchMovieBy } from "../types";

// Search movies by title or actor name
const useSearchMovies = (searchBy: SearchMovieBy, query: string) => {
  const trimmedQuery = query.trim();

  const {
    data: moviesByTitle,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = useGetMoviesByTitle(trimmedQuery, {
    enabled: searchBy === SearchMovieBy.Title && trimmedQuery.length > 0,
  });

  const {
    data: moviesByActorName,
    isFetching: isMoviesByActorNameFetching,
    hasNextPage: hasMoviesByActorName,
    fetchNextPage: fetchMoviesByActorName,
  } = useGetMovieByActorName(trimmedQuery, {
    enabled: searchBy === SearchMovieBy.Actor && trimmedQuery.length > 0,
  });

  return {
    movies:
      searchBy === SearchMovieBy.Title ? moviesByTitle : moviesByActorName,
    isFetching:
      searchBy === SearchMovieBy.Title
        ? isFetching
        : isMoviesByActorNameFetching,
    hasNextPage:
      searchBy === SearchMovieBy.Title ? hasNextPage : hasMoviesByActorName,
    fetchNextPage:
      searchBy === SearchMovieBy.Title ? fetchNextPage : fetchMoviesByActorName,
  };
};

export default useSearchMovies;
