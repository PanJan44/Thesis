import { CommonActions, useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { HeaderBackButton } from "@react-navigation/elements";
import { COLORS, FONTS } from "../../styles";
import { ArrowBackIcon } from "../../../assets/icons/ArrowBackIcon";
import { LogoutIcon } from "../../../assets/icons/LogoutIcon";

type Props = {
  title?: string
  isBackButtonVisible?: boolean,
  isLogoutButtonVisible?: boolean,
  onLogoutButtonPressed?: () => void,
  onBackButtonPressed?: () => void,
  onEditButtonPressed?: () => void,
}
export const TopBackNavigation = ({ title, isBackButtonVisible, isLogoutButtonVisible, onLogoutButtonPressed, onBackButtonPressed, onEditButtonPressed }: Props) => {
  const navigation = useNavigation();
  isBackButtonVisible ??= true;

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        {
          isBackButtonVisible &&
          <View style={styles.titleAndBackButtonWrapper}>
            <Pressable
              onPress={
                onBackButtonPressed ?? (() => navigation.goBack())
              }
            >
              <ArrowBackIcon />
            </Pressable>
            <Text style={styles.title}>
              {title}
            </Text>
          </View>
        }
        {
          isLogoutButtonVisible &&
          <View style={styles.editLogoutWrapper}>
            <Pressable
              style={{ paddingHorizontal: 8 }}
              onPress={onEditButtonPressed}
            >
              <Text style={styles.editButton}>Edytuj profil</Text>
            </Pressable>
            <Pressable onPress={onLogoutButtonPressed}>
              <LogoutIcon />
            </Pressable>
          </View>
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background["500"],
    paddingVertical: 12
  },
  title: {
    fontFamily: FONTS.primary.bold,
    fontSize: 16,
    color: "white",
    paddingHorizontal: 12
  },
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12 // Add padding for spacing
  },
  backButtonIcon: {
    paddingHorizontal: 8
  },
  titleAndBackButtonWrapper: {
    flexDirection: "row",
    alignItems: "center"
  },
  editButton: {
    fontFamily: FONTS.primary.bold
  },
  editLogoutWrapper: {
    flexDirection: "row",
    alignItems: "center"
  }
});
