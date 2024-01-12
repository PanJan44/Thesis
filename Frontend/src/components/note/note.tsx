import { StyleSheet, Text, View } from "react-native";
import { GroupedNotes } from "../../shared/types/shared.types";
import React from "react";

type Props = {
  groupedNotes: GroupedNotes[]

}
export const NoteView = ({ groupedNotes }: Props) => {
  return (
    <View>
      {groupedNotes.map(
        value => value.nickname
      )}
    </View>
  );
};

const styles = StyleSheet.create({});
