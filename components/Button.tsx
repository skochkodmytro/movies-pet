import { ReactNode } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityProps,
} from "react-native";

import { Colors } from "@/constants/Colors";

import { ThemedText } from "./ThemedText";

type ButtonProps = TouchableOpacityProps & {
  children: ReactNode;
  type?: "default" | "bordered";
  disabled?: boolean;
};

const Button = ({
  type = "default",
  children,
  disabled = false,
  style,
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, styles[type], disabled && styles.disabled, style]}
      disabled={disabled}
      {...props}
    >
      <ThemedText
        style={[
          styles.text,
          type === "bordered" ? styles.textBordered : styles.textDefault,
        ]}
      >
        {children}
      </ThemedText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  default: {
    backgroundColor: Colors.dark.primary,
  },
  bordered: {
    borderWidth: 2,
    borderColor: Colors.dark.primary,
    backgroundColor: "transparent",
  },
  disabled: {
    backgroundColor: Colors.dark.disabledText,
    borderColor: Colors.dark.disabledText,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  textDefault: {
    color: Colors.dark.white,
  },
  textBordered: {
    color: Colors.dark.primary,
  },
});

export default Button;
