import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONTS } from "../../styles";
import { ReactNode, useEffect, useState } from "react";
import { HomeIconFilled } from "../../../assets/icons/HomeIcon";
import { ExitIcon } from "../../../assets/icons/ExitIcon";

type Props = {
  modalVisibleProp: boolean,
  customElement: ReactNode[];
  onModalVisibleChange: (isVisible: boolean) => void;
  title: string;
}
export const MyModal = ({ modalVisibleProp, customElement, onModalVisibleChange, title }: Props) => {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setModalVisible(modalVisibleProp);
  }, [modalVisibleProp]);

  useEffect(() => {
    onModalVisibleChange(modalVisible);
  }, [modalVisible]);

  return (
    // <View>
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisibleProp);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.inputWrapper}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View>
            {customElement}
          </View>
          <View style={styles.hideIcon}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <ExitIcon />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
    // </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1
    // justifyContent: "center",
    // alignItems: "center",
  },

  modalView: {
    backgroundColor: COLORS.secondary["500"],
    borderBottomRightRadius: 0, // Set the radius to 0 for the bottom right
    borderBottomLeftRadius: 0, // Set the radius to 0 for the bottom left
    borderTopRightRadius: 10, // Adjust the radius for the top right as needed
    borderTopLeftRadius: 10,
    paddingHorizontal: 12,
    // alignItems: "center",
    // justifyContent: "flex-start",
    width: "100%",
    height: "70%",
    position: "absolute",
    bottom: 0
  },

  hideIcon: {
    position: "absolute",
    top: 0,
    left: 0,
    padding: 10
  },
  inputWrapper: {
    alignItems: "center",
    marginTop: 10
    // paddingVertical: 10
  },
  title: {
    fontFamily: FONTS.primary.bold,
    textTransform: "uppercase",
    color: "white",
    fontSize: 18
  }
});
