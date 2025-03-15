import { useCallback, useMemo, useState } from "react";
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Octicons from "@expo/vector-icons/Octicons";

import { SearchInput, Header, Select, Spinner, ThemedText } from "@/components";
import { Colors } from "@/constants/Colors";
import { useDebounce, useKeyboard } from "@/hooks";
import { useFavoritesMoviesContext } from "@/providers/FavoritesContext";

import { Movie, SearchMovieBy } from "../types";
import { useSearchMovies } from "../hooks";
import { FavoriteToggler, MovieCard } from "../components";

const SEARCH_BY_OPTIONS = [
  { label: "Title", value: SearchMovieBy.Title },
  { label: "Actor", value: SearchMovieBy.Actor },
];

const SearchMoviesView = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { keyboardHeight, isKeyboardVisible } = useKeyboard();

  const [searchBy, setSearchBy] = useState<SearchMovieBy>(SearchMovieBy.Title);
  const [query, setQuery] = useState("");
  const queryDebounce = useDebounce(query);

  const { favoritesMoviesIds, addMovieToFavorite, removeMovieFromFavorite } =
    useFavoritesMoviesContext();

  const { movies, hasNextPage, isFetching, fetchNextPage } = useSearchMovies(
    searchBy,
    queryDebounce
  );

  const toggleFavoriteMovie = useCallback(
    (isFavorite: boolean, id: number) => () => {
      (isFavorite ? removeMovieFromFavorite : addMovieToFavorite)(id);
    },
    [addMovieToFavorite, removeMovieFromFavorite]
  );

  const handleEndReached = useCallback(() => {
    if (!isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [isFetching, hasNextPage, fetchNextPage]);

  const renderMovieCard: ListRenderItem<Movie> = useCallback(
    ({ item }) => {
      const isFavorite = favoritesMoviesIds.includes(item.id);

      return (
        <TouchableOpacity
          style={styles.movieCardWrapper}
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
    [favoritesMoviesIds]
  );

  const renderListFooter = useMemo(
    () => (!isFetching ? null : <Spinner />),
    [isFetching]
  );

  const renderListEmpty = useMemo(() => {
    if (isFetching) return null;
    return <ThemedText style={styles.emptyText}>Movies not found</ThemedText>;
  }, [isFetching]);

  const keyExtractor = useCallback((item: Movie) => `${item.id}`, []);

  const listPaddingBottom = isKeyboardVisible ? keyboardHeight : insets.bottom;
  const showHelper = queryDebounce.trim().length === 0;
  const placeholderText =
    searchBy === SearchMovieBy.Title ? "Search by title" : "Search by actor";
  const helperText =
    searchBy === SearchMovieBy.Title ? "Type movie title" : "Type actor's name";

  return (
    <View style={styles.wrapper}>
      <Header />

      <View style={styles.header}>
        <View style={styles.inputWrapper}>
          <SearchInput
            value={query}
            autoFocus
            placeholder={placeholderText}
            onChangeText={setQuery}
          />
        </View>

        <Select
          value={searchBy}
          options={SEARCH_BY_OPTIONS}
          label="Find movie by"
          onChange={(value) => value && setSearchBy(value)}
        >
          <View style={styles.selectIconWrapper}>
            <Octicons name="multi-select" size={24} color={Colors.dark.white} />
          </View>
        </Select>
      </View>

      {showHelper ? (
        <ThemedText style={styles.emptyText}>{helperText}</ThemedText>
      ) : (
        <FlatList
          data={movies}
          renderItem={renderMovieCard}
          keyExtractor={keyExtractor}
          ListFooterComponent={renderListFooter}
          ListEmptyComponent={renderListEmpty}
          keyboardDismissMode="on-drag"
          contentContainerStyle={[
            styles.list,
            { paddingBottom: listPaddingBottom },
          ]}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  inputWrapper: {
    flex: 1,
  },
  selectIconWrapper: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  movieCardWrapper: {
    marginBottom: 20,
  },
  list: {
    paddingHorizontal: 12,
  },
  emptyText: {
    textAlign: "center",
    paddingVertical: 16,
    color: Colors.dark.secondaryText,
  },
});

export default SearchMoviesView;
