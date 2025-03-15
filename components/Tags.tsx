import { View, StyleSheet, TouchableOpacity } from "react-native";

import { Colors } from "@/constants/Colors";

import { ThemedText } from "./ThemedText";

type Tag = {
  label: string;
  value: string | number;
};

type TagsProps = {
  tags: Tag[];
  value?: (string | number)[];
  onPressTag?: (value: string | number) => void;
};

const Tags = ({ tags, value, onPressTag }: TagsProps) => {
  return (
    <View style={styles.container}>
      {tags.map((tag) => {
        const isSelected = value?.includes(tag.value);

        return (
          <TouchableOpacity
            key={tag.value}
            style={[styles.tag, isSelected && styles.selectedTag]}
            disabled={!onPressTag}
            onPress={() => onPressTag?.(tag.value)}
          >
            <ThemedText
              style={[styles.tagText, isSelected && styles.selectedTagText]}
            >
              {tag.label}
            </ThemedText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  tag: {
    backgroundColor: Colors.dark.primary,
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  tagText: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.dark.white,
  },
  selectedTag: {
    backgroundColor: Colors.dark.secondary,
  },
  selectedTagText: {
    color: Colors.dark.white,
  },
});

export default Tags;
