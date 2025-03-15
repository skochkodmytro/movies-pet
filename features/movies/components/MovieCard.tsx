import React, { ReactNode } from "react";
import { View, StyleSheet } from "react-native";

import { Colors } from "@/constants/Colors";
import { AsyncImage, ThemedText } from "@/components";
import { getImageUrl } from "@/utils/image";
import { formatVoteAverage } from "@/utils/number";

import { Movie } from "../types";

type MovieCardProps = {
  movie: Movie;
  renderFavoriteBlock?: ReactNode | null;
};

const MovieCard = ({ movie, renderFavoriteBlock }: MovieCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.posterWrapper}>
        <AsyncImage
          source={
            movie.poster_path
              ? { uri: getImageUrl(movie.poster_path, "w200") }
              : null
          }
          style={styles.poster}
        />
        <View style={styles.averageWrapper}>
          <ThemedText style={styles.averageText}>
            {formatVoteAverage(movie.vote_average)}
          </ThemedText>
        </View>
      </View>
      <View style={styles.info}>
        <View style={styles.infoHeader}>
          <ThemedText
            style={styles.infoTitle}
            type="subtitle"
            numberOfLines={2}
          >
            {movie.title}
          </ThemedText>

          {renderFavoriteBlock}
        </View>
        <ThemedText style={styles.dateReleaseText}>
          {movie.release_date}
        </ThemedText>
        <ThemedText numberOfLines={3} style={styles.overviewText}>
          {movie.overview}
        </ThemedText>

        {/* <ThemedText type="title">{movie.vote_average}</ThemedText> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    overflow: "hidden",
    borderRadius: 12,
    flexDirection: "row",
    gap: 10,
    backgroundColor: Colors.dark.cardBackground,
  },
  posterWrapper: {
    width: 100,
  },
  poster: {
    width: 100,
    height: 150,
  },
  averageWrapper: {
    position: "absolute",
    right: 5,
    top: 5,
    width: 30,
    height: 30,
    borderRadius: "50%",
    backgroundColor: Colors.dark.secondary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.55,
    shadowRadius: 3.84,

    elevation: 5,
  },
  averageText: {
    fontSize: 14,
    lineHeight: 30,
    fontWeight: "bold",
  },
  info: {
    flex: 1,
    paddingVertical: 10,
    paddingRight: 10,
  },
  infoHeader: {
    flexDirection: "row",
    gap: 5,
  },
  infoTitle: {
    flex: 1,
  },
  dateReleaseText: {
    marginBottom: 10,
  },
  overviewText: {
    fontSize: 14,
    lineHeight: 16,
  },
});

export default MovieCard;
