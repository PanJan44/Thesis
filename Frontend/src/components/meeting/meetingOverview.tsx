import { Alert, Image, StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import { MeetingOverview } from "../../shared/types/shared.types";
import { COLORS, FONTS } from "../../styles";
import { TimeFormatter } from "../../core/timeFormatter";
import { Menu, MenuOption, MenuOptions, MenuOptionsProps, MenuTrigger } from "react-native-popup-menu";
import { OptionsIcon } from "../../../assets/icons/OptionsIcon";
import { ComponentClass, ReactComponentElement, ReactNode } from "react";
import { useAuth } from "../../context/AuthContext";
import { TruncatedText } from "../truncatedText/truncatedText";

type Props = {
  menuOptions: ReactNode,
  userId?: number,
}
export const MeetingOverviewView = ({ title, id, end, start, location, image, menuOptions, userId }: MeetingOverview & Props) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const { authState } = useAuth();

  return (
    <View style={styles.container} key={id}>
      <TouchableNativeFeedback>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {
            image ?
              <Image source={{ uri: `data:${image?.contentType};base64,${image?.file}` }} style={styles.image} />
              :
              <Image source={require("../../../assets/images/logoFull.png")} style={styles.image} />
          }
          <View style={styles.wrapper}>
            <Text style={styles.title}>
              {title}
            </Text>
            <TruncatedText
              style={styles.location}
              text={location.placeName}
              maxLength={40}
            />
            <Text style={styles.date}>
              {TimeFormatter.formatToDayAndTime(startDate)} - {TimeFormatter.formatToDayAndTime(endDate)}
            </Text>
          </View>
          <View style={styles.options}>
            {
              authState?.userId == userId &&
              <Menu>
                <MenuTrigger
                  children={OptionsIcon()}
                  style={{ padding: 8 }}
                />
                {menuOptions}
              </Menu>
            }
          </View>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background["500"],
    // height: 50,
    flex: 1
    // minWidth: "100%"
  },
  image: {
    width: 50,
    height: 50
  },
  location: {
    fontFamily: FONTS.secondary.medium,
    fontSize: 12,
    color: COLORS.lightFont,
    textTransform: "uppercase"
    // letterSpacing: 0.3
  },
  title: {
    textTransform: "uppercase",
    fontFamily: FONTS.secondary.medium,
    color: "white"
  },
  wrapper: {
    padding: 4,
    width: "80%"
    // alignItems: "flex-start",
    // justifyContent: "flex-start"
  },
  date: {
    fontFamily: FONTS.secondary.light,
    fontSize: 12
  },
  options: {
    // padding: 12,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
