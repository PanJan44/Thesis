import { FlatList, StyleSheet, View } from "react-native";
import { User } from "../../shared/types/shared.types";
import { Participant } from "../participant/participant";
import { MyModal } from "../myModal/myModal";
import React from "react";

type Props = {
  participants: User[];
  modalVisibleProp: boolean;
  onModalVisibleChange: (isVisible: boolean) => void;
}
export const ParticipantsModal = ({ participants, onModalVisibleChange, modalVisibleProp }: Props) => {
  const participantsView = () => {
    return (
      <View style={{ marginTop: 40 }} key={1}>
        <FlatList
          data={participants} renderItem={itemData => {
          return (
            <Participant
              {...itemData.item}
            />
          );
        }}
        />
      </View>
    );
  };

  return (
    <MyModal
      modalVisibleProp={modalVisibleProp}
      customElement={[participantsView()]}
      onModalVisibleChange={onModalVisibleChange}
      title={"uczestnicy"}
    />
  );
};

const styles = StyleSheet.create({});
