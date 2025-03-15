import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AntDesign } from "@expo/vector-icons";

import { Colors } from "@/constants/Colors";

import { ThemedText } from "./ThemedText";

const Header = ({ title }: { title?: string }) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={[styles.header, { paddingTop: insets.top }]}>
      <TouchableOpacity onPress={router.back} style={styles.backButton}>
        <AntDesign name="arrowleft" size={24} color={Colors.dark.white} />
      </TouchableOpacity>
      {title && <ThemedText type="subtitle">{title}</ThemedText>}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 12,
    backgroundColor: Colors.dark.background,
    shadowColor: Colors.dark.white,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 50,
  },
  backButton: {
    padding: 8,
  },
});

export default Header;
