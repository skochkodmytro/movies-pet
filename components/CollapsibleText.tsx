import { ReactNode, useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  TextStyle,
  LayoutChangeEvent,
} from "react-native";

import { ThemedText } from "./ThemedText";

import { useBoolean } from "@/hooks";
import { Colors } from "@/constants/Colors";

type CollapsibleTextProps = {
  children: ReactNode;
  numberOfLines?: number;
  textStyle?: TextStyle;
};

const CollapsibleText = ({
  children,
  textStyle,
  numberOfLines = 3,
}: CollapsibleTextProps) => {
  const [textHeight, setTextHeight] = useState(0);
  const { value: isCollapsed, toggle: toggleCollapse } = useBoolean(true);

  const containerHeight = numberOfLines * (textStyle?.lineHeight || 24);

  const onTextLayout = (e: LayoutChangeEvent) => {
    const { height } = e.nativeEvent.layout;
    setTextHeight(height);
  };

  const isTextFitting = textHeight <= containerHeight;

  return (
    <View>
      <View
        style={[
          styles.textWrapper,
          {
            height: isCollapsed ? containerHeight : textHeight,
          },
        ]}
      >
        <View
          style={[
            styles.textInner,
            {
              height: textHeight || "auto",
            },
          ]}
        >
          <ThemedText style={[textStyle]} onLayout={onTextLayout}>
            {children}
          </ThemedText>
        </View>
      </View>

      {!isTextFitting && (
        <TouchableOpacity onPress={toggleCollapse} style={styles.button}>
          <ThemedText style={styles.buttonText}>
            {isCollapsed ? "Read More" : "Read Less"}
          </ThemedText>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textWrapper: {
    overflow: "hidden",
  },
  textInner: {
    position: "absolute",
    left: 0,
    right: 0,
  },
  button: {
    marginTop: 5,
  },
  buttonText: {
    color: Colors.dark.primary,
    fontSize: 14,
  },
});

export default CollapsibleText;
