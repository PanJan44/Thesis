import { Pressable, StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import { FONTS } from "../../styles";

type Props = {
  text: string;
  onPress: () => void;
}
export const SimpleButton = ({ text, onPress }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      style={styles.button}
    >
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderColor: "white",
    borderRadius: 12,
    borderWidth: 1,
    padding: 6
  },
  text: {
    fontFamily: FONTS.primary.bold
  }
});
