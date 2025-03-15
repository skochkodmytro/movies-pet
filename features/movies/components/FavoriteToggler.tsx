import { TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

import { Colors } from "@/constants/Colors";

type FavoriteTogglerProps = {
  isFavorite: boolean;
  onPress: () => void;
};

const FavoriteToggler = ({ isFavorite, onPress }: FavoriteTogglerProps) => (
  <TouchableOpacity hitSlop={12} onPress={onPress}>
    <AntDesign
      name={isFavorite ? "heart" : "hearto"}
      size={24}
      color={Colors.dark.primary}
    />
  </TouchableOpacity>
);

export default FavoriteToggler;
