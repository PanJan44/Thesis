import { StyleSheet, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../core/navigation/types/navigation.types";
import { ProfileScreen } from "./profileScreen";
import { COLORS } from "../../styles";

type Props = NativeStackScreenProps<RootStackParams, "MyProfile">;
const MyProfileScreen = ({ navigation, route }: Props) => {
  return (
    <View style={styles.container}>
      <ProfileScreen navigation={navigation} route={route} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background["500"]
  }
});

export default MyProfileScreen;
