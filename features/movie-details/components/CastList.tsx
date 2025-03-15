import { FlatList, ListRenderItem, StyleSheet } from "react-native";

import { ThemedText } from "@/components";
import { Colors } from "@/constants/Colors";
import { Person } from "@/features/persons";

import CastMemberCard from "./CastMemberCard";

type CastListProps = {
  data: Person[];
};

const CastList = ({ data }: CastListProps) => {
  const renderCastMember: ListRenderItem<Person> = ({ item }) => {
    return <CastMemberCard {...item} />;
  };

  const renderEmpty = () => {
    return <ThemedText style={styles.emptyText}>No cast was found</ThemedText>;
  };

  const keyExtractor = (item: Person) => `${item.id}`;

  return (
    <FlatList
      data={data}
      renderItem={renderCastMember}
      keyExtractor={keyExtractor}
      horizontal
      showsHorizontalScrollIndicator={false}
      scrollEnabled={data.length > 0}
      contentContainerStyle={[
        styles.contentContainer,
        { justifyContent: data.length > 0 ? "flex-start" : "center" },
      ]}
      ListEmptyComponent={renderEmpty}
    />
  );
};

const styles = StyleSheet.create({
  emptyText: {
    flex: 1,
    color: Colors.dark.secondaryText,
    textAlign: "center",
    width: "100%",
  },
  contentContainer: {
    flexGrow: 1,
    gap: 10,
  },
});

export default CastList;
