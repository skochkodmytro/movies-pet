import { StyleSheet, View } from "react-native";
import {
  Slider as RNSlider,
  SliderProps,
} from "@miblanchard/react-native-slider";

import { Colors } from "@/constants/Colors";

import { ThemedText } from "./ThemedText";

const Slider = ({
  maximumValue,
  minimumValue,
  value,
  ...rest
}: Partial<SliderProps>) => {
  const leftValue = Array.isArray(value) ? value[0] : minimumValue;
  const rightValue = Array.isArray(value) ? value[1] : maximumValue;

  return (
    <View>
      <View style={styles.header}>
        <ThemedText style={styles.headerText}>{leftValue}</ThemedText>
        <ThemedText style={styles.headerText}>{rightValue}</ThemedText>
      </View>
      <RNSlider
        value={value}
        maximumValue={maximumValue}
        minimumValue={minimumValue}
        thumbTintColor={Colors.dark.primary}
        minimumTrackTintColor={Colors.dark.primary}
        maximumTrackTintColor={Colors.dark.secondaryText}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.dark.primary,
  },
});

export default Slider;
