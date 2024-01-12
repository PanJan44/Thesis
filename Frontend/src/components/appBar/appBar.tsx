import { StyleSheet, Text, View } from "react-native";
import { COLORS, FONTS } from "../../styles";
import { Constants } from "../../shared/constants/consts.enum";

const AppBar = () => {
  return (
    <View style={styles.appBar}>
      <Text style={styles.title}>{Constants.APP_TITLE}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  appBar: {
    backgroundColor: COLORS.background["500"],
    padding: 16
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    fontFamily: FONTS.primary.bolder ,
    color: "white"
  }
});

export default AppBar;
