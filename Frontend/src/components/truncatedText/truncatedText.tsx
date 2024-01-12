import { Button, StyleProp, Text, TextStyle } from "react-native";
import React from "react";

type Props = {
  text: string,
  maxLength: number,
  // style: TextStyle
}
export const TruncatedText = ({ text, maxLength, ...rest }: Props & React.ComponentProps<typeof Text>) => {
  if (text.length <= maxLength) {
    return <Text style={rest.style}>{text}</Text>;
  } else {
    const truncatedText = text.substring(0, maxLength) + "...";
    return <Text style={rest.style}>{truncatedText}</Text>;
  }
};
