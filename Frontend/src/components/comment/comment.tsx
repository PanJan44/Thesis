import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { Role, User } from "../../shared/types/shared.types";
import { useAuth } from "../../context/AuthContext";
import { TimeFormatter } from "../../core/timeFormatter";
import { Comment } from "../meeting/types/meeting.type";
import { COLORS, FONTS } from "../../styles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import homeScreen from "../../screens/homeScreen/homeScreen";
import { HomeStackParams } from "../../core/navigation/types/navigation.types";
import { Menu, MenuOption, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import { OptionsIcon } from "../../../assets/icons/OptionsIcon";
import { UserApi } from "../../screens/profileScreen/user.api";
import { MiscIcon } from "../../../assets/icons/MiscIcon";
import { MinusIcon } from "../../../assets/icons/MinusIcon";

type Props = {
  onRemoveComment?: () => void;
}
const CommentView = ({ id, content, author, creationTime, onRemoveComment }: Comment & Props) => {
  const { authState } = useAuth();
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParams, "ProfileStack">>();
  creationTime = new Date(creationTime);
  console.log("rola (z komenatrzy):", authState?.role);
  // console.log("czy rownne: ", authState?.role == Role.Admin.toString());
  console.log("admin: ", Role.Admin.toString());

  const removeComment = async (id: number) => {
    await UserApi.removeUserComment(id);
    Alert.alert("Pomyślnie usunięto komentarz");
  };

  return (
    <View style={styles.container}>
      <View style={styles.authorAndTime}>
        <Pressable onPress={() => navigation.navigate("ProfileStack", { screen: "Profile", params: { id: author.id } })}>
          <Text style={styles.author}>{author.nickname}</Text>
        </Pressable>
        <Text style={styles.time}>{TimeFormatter.formatToDayAndTime(creationTime)}</Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={styles.content}>{content}</Text>
        {
          authState?.role == Role.Admin.toString() &&
          <Pressable onPress={async () => {
            await UserApi.removeUserComment(id);
          }}>
            <MinusIcon />
          </Pressable>
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12
  },
  authorAndTime: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 2
  },
  content: {
    fontFamily: FONTS.secondary.medium,
    color: "white",
    fontSize: 14
  },
  author: {
    fontFamily: FONTS.primary.bold
  },

  time: {
    fontFamily: FONTS.secondary.medium,
    color: COLORS.lightFont
  }
});

export default CommentView;
