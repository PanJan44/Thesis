import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { ButtonWithOutlineResponse } from "../../components/buttonWithOutlineResponse/buttonWithOutlineResponse";

const buttons: { title: string, index: number }[] = [
  { title: "Organizowane", index: 0 },
  { title: "Bierze udział", index: 1 },
  { title: "Brał udział", index: 2 }
];
type Props = {
  onIndexChanged: (index: number) => void
}
export const MeetingsPicker = ({ onIndexChanged }: Props) => {
  const [selectedButton, setSelectedButton] = useState<number | null>(0);

  return (
    <View
      style={{ flexDirection: "row" }}
      key={selectedButton}
    >
      {buttons.map((button) => (
        <View style={{ paddingHorizontal: 8 }} key={button.index}>
          <ButtonWithOutlineResponse
            key={button.index}
            index={button.index}
            title={button.title}
            selected={selectedButton == button.index}
            onSelected={() => {
              setSelectedButton(button.index);
              onIndexChanged(button.index);
            }}
          />
        </View>
      ))}
    </View>
  );
};
