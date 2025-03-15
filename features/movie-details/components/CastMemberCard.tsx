import { StyleSheet, View } from "react-native";

import { Colors } from "@/constants/Colors";
import { AsyncImage, ThemedText } from "@/components";
import { getImageUrl } from "@/utils/image";

type CastMemberCardProps = {
  profile_path: string;
  name: string;
  character: string;
};

const CastMemberCard = ({
  profile_path,
  name,
  character,
}: CastMemberCardProps) => {
  return (
    <View style={styles.card}>
      <AsyncImage
        source={
          profile_path ? { uri: getImageUrl(profile_path, "w200") } : null
        }
        placeholder={require("@/assets/images/profile_placeholder.png")}
        style={styles.profileImage}
      />
      <View style={styles.info}>
        <ThemedText style={styles.nameText}>{name}</ThemedText>
        <ThemedText style={styles.characterText}>{character}</ThemedText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 100,
    gap: 10,
    backgroundColor: Colors.dark.cardBackground,
    borderRadius: 8,
    overflow: "hidden",
  },
  profileImage: {
    width: 100,
    height: 150,
  },
  info: {
    padding: 6,
  },
  nameText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  characterText: {
    fontSize: 12,
    color: Colors.dark.secondaryText,
  },
});

export default CastMemberCard;
