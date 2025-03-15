import { useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useBoolean } from "@/hooks";

import { Colors } from "@/constants/Colors";
import { Button, CommonModal, Tags, ThemedText, Slider } from "@/components";

import { MoviesFilter as TMoviesFilter } from "../types";
import { useGetGenres } from "../api";

type MoviesFilterProps = {
  initialFilter: TMoviesFilter;
  onChange: (filter: TMoviesFilter) => void;
};

const MoviesFilter = ({ initialFilter, onChange }: MoviesFilterProps) => {
  const [filter, setFilter] = useState<TMoviesFilter>(initialFilter);
  const {
    value: isFilterOpen,
    setTrue: openFilter,
    setFalse: closeFilter,
  } = useBoolean(false);

  const { genres } = useGetGenres();
  const genresTags = genres
    ? genres.map((genre) => ({ value: genre.id, label: genre.name }))
    : [];

  useEffect(() => {
    if (isFilterOpen) setFilter(initialFilter);
  }, [isFilterOpen]);

  const handlePressGenre = (id: number | string) => {
    const copiedGenres = filter?.with_genres ? [...filter.with_genres] : [];
    const findGenreIndex = copiedGenres.findIndex((genreId) => genreId === id);

    if (findGenreIndex === -1) {
      return setFilter({
        ...filter,
        with_genres: [...copiedGenres, id as number],
      });
    }

    copiedGenres.splice(findGenreIndex, 1);
    setFilter({ ...filter, with_genres: copiedGenres });
  };

  const handleChangeVoteRange = (range: number[]) => {
    setFilter({
      ...filter,
      "vote_average.gte": range[0],
      "vote_average.lte": range[1],
    });
  };

  const handleApply = () => {
    onChange(filter);
    closeFilter();
  };

  const handleReset = () => {
    onChange({});
    closeFilter();
  };

  const voteAverageRange = useMemo(() => {
    return [filter["vote_average.gte"] || 1, filter["vote_average.lte"] || 10];
  }, [filter]);

  return (
    <View>
      <TouchableOpacity
        hitSlop={12}
        style={styles.filterIcon}
        onPress={openFilter}
      >
        <MaterialCommunityIcons
          name="filter-outline"
          size={24}
          color={Colors.dark.white}
        />
      </TouchableOpacity>

      <CommonModal visible={isFilterOpen} onClose={closeFilter}>
        <ThemedText type="subtitle" style={styles.subtitle}>
          Filter
        </ThemedText>

        <ScrollView alwaysBounceVertical={false}>
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Genres</ThemedText>

            <Tags
              tags={genresTags}
              value={filter.with_genres || []}
              onPressTag={handlePressGenre}
            />
          </View>

          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>User Score</ThemedText>

            <Slider
              value={voteAverageRange}
              minimumValue={1}
              maximumValue={10}
              step={1}
              onValueChange={handleChangeVoteRange}
            />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.footerAction}>
            <Button type="bordered" onPress={handleReset}>
              Reset
            </Button>
          </View>
          <View style={styles.footerAction}>
            <Button onPress={handleApply}>Apply</Button>
          </View>
        </View>
      </CommonModal>
    </View>
  );
};

const styles = StyleSheet.create({
  filterIcon: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  subtitle: {
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    marginBottom: 10,
    color: Colors.dark.secondaryText,
  },
  footer: {
    flexDirection: "row",
    gap: 20,
    paddingBottom: 10,
  },
  footerAction: {
    flex: 1,
  },
});

export default MoviesFilter;
