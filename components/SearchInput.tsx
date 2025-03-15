import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";

import { Colors } from "@/constants/Colors";

const SearchInput = ({
  style,
  value = "",
  onChangeText,
  ...rest
}: TextInputProps) => {
  return (
    <View style={styles.container}>
      <AntDesign
        name="search1"
        size={20}
        color={Colors.dark.white}
        style={styles.icon}
      />
      <TextInput
        style={[styles.input, style]}
        placeholder="Search"
        placeholderTextColor={Colors.dark.placeholderText}
        value={value}
        onChangeText={onChangeText}
        {...rest}
      />
      {value.length > 0 && (
        <TouchableOpacity hitSlop={10}>
          <AntDesign
            name="close"
            size={20}
            color={Colors.dark.white}
            style={styles.icon}
            onPress={() => onChangeText?.("")}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.dark.background,
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  icon: {
    marginHorizontal: 5,
  },
  input: {
    flex: 1,
    height: "100%",
    color: Colors.dark.white,
    fontSize: 16,
    paddingHorizontal: 5,
  },
});

export default SearchInput;
