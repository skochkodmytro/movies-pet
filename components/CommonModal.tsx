import { ReactNode } from "react";
import { Modal, ModalProps, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Colors } from "@/constants/Colors";

type CommonModalProps = ModalProps & {
  children: ReactNode;
  onClose: () => void;
};

const CommonModal = ({ children, onClose, ...rest }: CommonModalProps) => {
  const insets = useSafeAreaInsets();

  return (
    <Modal style={styles.modal} transparent animationType="fade" {...rest}>
      <Pressable style={styles.modalOverlay} onPress={onClose} />

      <View style={[styles.modalContent, { paddingBottom: insets.bottom }]}>
        {children}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    padding: 0,
    margin: 0,
  },
  modalOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: Colors.dark.black,
    opacity: 0.7,
  },
  modalContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 12,
    paddingTop: 12,
    backgroundColor: Colors.dark.background,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
});

export default CommonModal;
