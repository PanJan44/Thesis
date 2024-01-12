import { Button, Pressable, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../styles";

type Props = {
  onPress: () => void;
}
export const SearchTemplateButton = ({ onPress }: Props) => {
  return (
    <View style={styles.buttonWrapper}>
      <TouchableNativeFeedback onPress={onPress}>
        <View>
          <Text style={styles.text}>Gdzie chcesz trenować?</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    backgroundColor: COLORS.secondary["500"],
    borderRadius: 16,
    overflow: "hidden",
    width: "95%"
  },

  text: {
    padding: 16,
    // overflow: "hidden"
    borderRadius: 16,
    color: COLORS.lightFont,
  }
});
