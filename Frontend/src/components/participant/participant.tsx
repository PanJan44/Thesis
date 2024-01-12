import { Pressable, StyleSheet, Text, View } from "react-native";
import { ParticipateIcon } from "../../../assets/icons/ParticipateIcon";
import { COLORS, FONTS } from "../../styles";
import { User } from "../../shared/types/shared.types";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { HomeStackParams, ProfileStackParams } from "../../core/navigation/types/navigation.types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export const Participant = ({ id, nickname }: User) => {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParams, "ProfileStack">>();
  return (
    <View style={styles.container}>
      <ParticipateIcon color={COLORS.primary["300"]} />
      <Pressable
        onPress={() => {
          navigation.navigate("ProfileStack", { screen: "Profile", params: { id } });
        }
        }
      >
        <Text style={styles.nickname}>{nickname}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 60
  },
  nickname: {
    color: "white",
    fontFamily: FONTS.primary.bold,
    fontSize: 16
  }
});
