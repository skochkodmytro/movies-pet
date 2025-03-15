import { useCallback, useMemo, useState } from "react";
import {
  View,
  FlatList,
  ListRenderItem,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { SearchInput, Spinner } from "@/components";
import { useFavoritesMoviesContext } from "@/providers/FavoritesContext";

import { useGetTopRatedMovies } from "../api";
import {
  Movie,
  RequestMoviesFilterDto,
  MoviesFilter as TMoviesFilter,
} from "../types";
import { FavoriteToggler, MovieCard, MoviesFilter } from "../components";

const MoviesListView = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { favoritesMoviesIds, addMovieToFavorite, removeMovieFromFavorite } =
    useFavoritesMoviesContext();

  const [filter, setFilter] = useState<TMoviesFilter>({});
  const requestFilterFormat: RequestMoviesFilterDto = useMemo(() => {
    return {
      with_genres: filter.with_genres
        ? filter.with_genres.join("|")
        : undefined,
      "vote_average.gte": filter?.["vote_average.gte"],
      "vote_average.lte": filter?.["vote_average.lte"],
    };
  }, [filter]);

  const {
    data,
    isFetching,
    hasNextPage,
    isRefetching,
    fetchNextPage,
    refetch: refetchMovies,
  } = useGetTopRatedMovies(requestFilterFormat);

  const handleEndReached = useCallback(() => {
    if (!isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [isFetching, hasNextPage, fetchNextPage]);

  const toggleFavoriteMovie = useCallback(
    (isFavorite: boolean, id: number) => () => {
      (isFavorite ? removeMovieFromFavorite : addMovieToFavorite)(id);
    },
    [addMovieToFavorite, removeMovieFromFavorite]
  );

  const renderMovieCard: ListRenderItem<Movie> = useCallback(
    ({ item }) => {
      const isFavorite = favoritesMoviesIds.includes(item.id);

      return (
        <TouchableOpacity
          style={styles.cardWrapper}
          onPress={() => router.push(`/movie/${item.id}`)}
        >
          <MovieCard
            movie={item}
            renderFavoriteBlock={
              <FavoriteToggler
                isFavorite={isFavorite}
                onPress={toggleFavoriteMovie(isFavorite, item.id)}
              />
            }
          />
        </TouchableOpacity>
      );
    },
    [favoritesMoviesIds, toggleFavoriteMovie]
  );

  const renderListFooter = useMemo(
    () => (!isFetching ? null : <Spinner />),
    [isFetching]
  );

  const keyExtractor = useCallback((item: Movie) => `${item.id}`, []);

  return (
    <View style={[styles.wrapper, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <View style={styles.inputWrapper}>
          <SearchInput placeholder="Search by title or actor" />
          <TouchableOpacity
            style={styles.inputClickWrapper}
            onPress={() => router.push("/search")}
          />
        </View>

        <MoviesFilter initialFilter={filter} onChange={setFilter} />
      </View>

      <FlatList
        data={data || []}
        renderItem={renderMovieCard}
        keyExtractor={keyExtractor}
        contentContainerStyle={{ paddingHorizontal: 12 }}
        ListFooterComponent={renderListFooter}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetchMovies} />
        }
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  cardWrapper: {
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 12,
    paddingBottom: 10,
  },
  inputWrapper: {
    flex: 1,
  },
  inputClickWrapper: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  filterIcon: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MoviesListView;
