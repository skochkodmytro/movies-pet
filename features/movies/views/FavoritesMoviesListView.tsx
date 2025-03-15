import { useCallback, useMemo } from "react";
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import { Spinner } from "@/components";
import { MovieDetailed } from "@/features/movie-details";

import { useGetFavoritesMovies } from "../api";
import { FavoriteToggler, MovieCard } from "../components";

const FavoritesMoviesListView = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const {
    movies,
    canFetchMore,
    isLoading,
    fetchMore,
    removeMovieFromFavorite,
  } = useGetFavoritesMovies();

  const handleEndReached = () => {
    if (canFetchMore) fetchMore();
  };

  const handleRemoveMovieFromFavorite = useCallback(
    (id: number) => () => {
      removeMovieFromFavorite(id);
    },
    []
  );

  const renderMovieCard: ListRenderItem<MovieDetailed> = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => router.push(`/movie/${item.id}`)}
      >
        <MovieCard
          movie={item}
          renderFavoriteBlock={
            <FavoriteToggler
              isFavorite
              onPress={handleRemoveMovieFromFavorite(item.id)}
            />
          }
        />
      </TouchableOpacity>
    );
  };

  const renderListFooter = useMemo(
    () => (!isLoading ? null : <Spinner />),
    [isLoading]
  );

  const keyExtractor = useCallback((item: MovieDetailed) => `${item.id}`, []);

  return (
    <View style={{ paddingTop: insets.top, flex: 1 }}>
      <FlatList
        data={movies || []}
        renderItem={renderMovieCard}
        onEndReached={handleEndReached}
        keyExtractor={keyExtractor}
        onEndReachedThreshold={0.5}
        contentContainerStyle={{ paddingHorizontal: 12 }}
        ListFooterComponent={renderListFooter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 20,
  },
});

export default FavoritesMoviesListView;
