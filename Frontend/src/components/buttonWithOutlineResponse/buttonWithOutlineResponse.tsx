import { Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS, FONTS } from "../../styles";

type Props = {
  title: string,
  selected: boolean,
  onSelected: (index: number) => void,
  index: number
}

export const ButtonWithOutlineResponse = ({ title, onSelected, selected, index }: Props) => {
  return (
    <View style={[
      styles.container,
      {
        borderColor: selected ? COLORS.primary["300"] : COLORS.lightFont
      }
    ]} key={index}
    >
      <Pressable key={index} onPress={() => onSelected(index)}>
        <View style={{ padding: 12 }}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background["500"],
    borderWidth: 2,
    borderRadius: 8
  },
  title: {
    color: "white",
    fontFamily: FONTS.secondary.medium
  }
});
