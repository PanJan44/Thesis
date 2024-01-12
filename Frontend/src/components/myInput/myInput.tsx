import { StyleSheet, TextInput, View } from "react-native";
import React from "react";
import { COLORS, FONTS } from "../../styles";

const myInput = ({ ...rest }: React.ComponentProps<typeof TextInput>) => {
  return (
    <View style={styles.container}>
      <TextInput style={styles.input}  placeholderTextColor={COLORS.secondary["300"]} {...rest} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.secondary["500"],
    borderRadius: 16,
    height: 50
  },
  input: {
    fontFamily: FONTS.secondary.medium,
    color: "white",
    fontSize: 14
  }
});

export default myInput;
