import { ScrollView, StyleSheet, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  AsyncImage,
  CollapsibleText,
  Header,
  Spinner,
  Tags,
  ThemedText,
} from "@/components";

import { getImageUrl } from "@/utils/image";
import { Colors } from "@/constants/Colors";

import { useGetMovieById, useGetMovieCast } from "../api";
import { FavoriteToggler } from "@/features/movies";
import { useFavoritesMoviesContext } from "@/providers/FavoritesContext";

import { CastList } from "../components";
import { isAndroid, isIOS } from "@/constants/Device";

const MovieDetailsView = () => {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams();
  const { favoritesMoviesIds, addMovieToFavorite, removeMovieFromFavorite } =
    useFavoritesMoviesContext();

  const { movie, isFetching } = useGetMovieById(+id);
  const { data: movieCredit, isFetching: isMovieCastFetching } =
    useGetMovieCast(+id);

  const handleToggleFavorite = () => {
    (isFavorite ? removeMovieFromFavorite : addMovieToFavorite)(+id);
  };

  const movieGenres = movie
    ? movie?.genres.map((genre) => ({
        label: genre.name,
        value: genre.id,
      }))
    : [];

  const isFavorite = favoritesMoviesIds.includes(+id);

  return (
    <View style={{ flex: 1 }}>
      {isAndroid && <Header />}
      <ScrollView
        contentContainerStyle={[
          styles.wrapper,
          { paddingBottom: insets.bottom, paddingTop: isIOS ? insets.top : 10 },
        ]}
      >
        {isFetching ? (
          <Spinner size="large" />
        ) : (
          <View style={{ flex: 1 }}>
            <View style={styles.info}>
              <View style={styles.leftInfo}>
                <View>
                  <AsyncImage
                    source={
                      movie?.poster_path
                        ? { uri: getImageUrl(movie?.poster_path, "w200") }
                        : null
                    }
                    style={styles.poster}
                  />
                  <View style={styles.favoriteTogglerWrapper}>
                    <FavoriteToggler
                      isFavorite={isFavorite}
                      onPress={handleToggleFavorite}
                    />
                  </View>
                </View>

                <Tags tags={movieGenres} />
              </View>

              <View style={styles.mainInfo}>
                <ThemedText type="subtitle">{movie?.title}</ThemedText>
                <ThemedText style={styles.movieIdText}>
                  id:{movie?.id}
                </ThemedText>
                <ThemedText>{movie?.release_date}</ThemedText>

                <CollapsibleText
                  textStyle={{ color: Colors.dark.secondaryText }}
                  numberOfLines={5}
                >
                  {movie?.overview} {movie?.overview} {movie?.overview}
                </CollapsibleText>
              </View>
            </View>

            <View style={styles.cast}>
              <ThemedText type="subtitle" style={styles.castTitle}>
                Cast
              </ThemedText>

              {isMovieCastFetching ? (
                <Spinner />
              ) : (
                <CastList data={movieCredit?.cast || []} />
              )}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 12,
    flexGrow: 1,
  },
  info: {
    flexDirection: "row",
    gap: 15,
  },
  leftInfo: {
    width: 160,
    gap: 15,
  },
  poster: {
    width: 150,
    height: 250,
    borderRadius: 12,
  },
  favoriteTogglerWrapper: {
    position: "absolute",
    top: -10,
    left: -10,
    width: 35,
    height: 35,
    backgroundColor: Colors.dark.background,
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  mainInfo: {
    flex: 1,
    gap: 10,
  },
  movieIdText: {
    fontStyle: "italic",
  },
  cast: {
    marginTop: 30,
  },
  castTitle: {
    marginBottom: 15,
  },
});

export default MovieDetailsView;
