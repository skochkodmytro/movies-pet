import { ReactNode } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

import { useBoolean } from "@/hooks";
import { Colors } from "@/constants/Colors";

import { ThemedText } from "./ThemedText";
import CommonModal from "./CommonModal";

type Option = {
  label: string;
  value: number;
};

type SelectProps = {
  value: number | null;
  options: Option[];
  children: ReactNode;
  label?: string;
  onChange: (value: number | null) => void;
};

const Select = ({ value, options, children, label, onChange }: SelectProps) => {
  const {
    value: isModalOpen,
    setTrue: openModal,
    setFalse: closeModal,
  } = useBoolean(false);

  const handleChangeValue = (value: number | null) => () => {
    onChange(value);
    closeModal();
  };

  return (
    <View>
      <TouchableOpacity hitSlop={12} onPress={openModal}>
        {children}
      </TouchableOpacity>

      <CommonModal visible={isModalOpen} onClose={closeModal}>
        {label && (
          <ThemedText style={styles.label} type="subtitle">
            {label}
          </ThemedText>
        )}

        {options.map((option, index) => {
          const isLast = index === options.length - 1;
          const isSelected = value === option.value;

          return (
            <TouchableOpacity
              key={option.value}
              style={[styles.optionItem, isLast && { borderBottomWidth: 0 }]}
              onPress={handleChangeValue(option.value)}
            >
              <ThemedText style={styles.optionLabel}>{option.label}</ThemedText>
              {isSelected && (
                <FontAwesome6
                  name="check"
                  size={16}
                  color={Colors.dark.white}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </CommonModal>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    padding: 0,
    margin: 0,
  },
  label: {
    marginBottom: 12,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 0.2,
    borderColor: Colors.dark.white,
  },
  optionLabel: {
    flex: 1,
  },
});

export default Select;
