import { Button, Pressable, StyleProp, StyleSheet, Text, TouchableHighlight, TouchableOpacity, ViewStyle } from "react-native";
import React from "react";
import { COLORS, FONTS } from "../../styles";

type Props = {
  backgroundColor: string,
  // underlayColor: string
  customStyle?: StyleProp<ViewStyle>;
}

const MyButton = ({ backgroundColor, customStyle, ...rest }: Props & React.ComponentProps<typeof Button>) => {
  return (
    <TouchableHighlight
      style={[customStyle, styles.button, { backgroundColor: handleButtonDisableStyle(backgroundColor, rest.disabled) }]}
      underlayColor={handleUnderlayColor(backgroundColor)}
      {...rest}
    >
      <Text style={[styles.text, { color: rest.disabled ? COLORS.secondary["300"] : "white" }]}>{rest.title}</Text>
    </TouchableHighlight>
  );

  function handleButtonDisableStyle(backgroundColor: string, disabled: boolean | undefined): string {
    if (disabled) {
      if (backgroundColor == COLORS.primary["300"])
        return COLORS.primary["100"];
      if (backgroundColor == COLORS.secondary["500"])
        return COLORS.secondary["300"];
      return backgroundColor;
    }
    return backgroundColor;
  }

  function handleUnderlayColor(backgroundColor: string): string {
    if (backgroundColor == COLORS.primary["300"])
      return COLORS.primary["100"];
    if (backgroundColor == COLORS.secondary["500"])
      return COLORS.secondary["300"];
    return backgroundColor;
  }
};

const styles = StyleSheet.create({
  button: {
    // width: 100,
    height: 40,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "white",
    fontFamily: FONTS.secondary.medium,
    fontSize: 16,
    paddingHorizontal: 10
  }
});

export default MyButton;
