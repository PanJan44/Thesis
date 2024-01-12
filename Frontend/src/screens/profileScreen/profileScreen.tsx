import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { COLORS, FONTS } from "../../styles";
import { TopBackNavigation } from "../../components/topBackNavigation/topBackNavigation";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParams, LoginStackParams, ProfileStackParams, RootStackParams } from "../../core/navigation/types/navigation.types";
import { useEffect, useState } from "react";
import { UserApi } from "./user.api";
import { MeetingOverview, Role, UserAdditionalInfo, UserDetails } from "../../shared/types/shared.types";
import { CommonActions, Route, RouteProp, useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import { MeetingOverviewView } from "../../components/meeting/meetingOverview";
import { EnumMapper } from "../../core/enumMapper";
import { MeetingsPicker } from "./meetingsPicker";
import { useAuth } from "../../context/AuthContext";
import { MenuOption, MenuOptions } from "react-native-popup-menu";
import { DialogBox } from "../../components/dialogBox/dialogBox";
import MyInput from "../../components/myInput/myInput";
import MeetingApi from "../../components/meeting/api/meeting.api";
import { TimeFormatter } from "../../core/timeFormatter";
import MyButton from "../../components/myButton/myButton";

type Props = NativeStackScreenProps<HomeStackParams, "ProfileStack">
  | NativeStackScreenProps<RootStackParams, "MyProfile">
  | NativeStackScreenProps<ProfileStackParams, "Profile">;
export const ProfileScreen = ({ navigation, route }: Props) => {
    const { authState, onLogout } = useAuth();
    const [user, setUser] = useState<UserDetails>();
    const [meetings, setMeetings] = useState<MeetingOverview[]>();
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [dialogVisible, setDialogVisible] = useState<boolean>(false);
    const [note, setNote] = useState<string>();
    const [selectedMeeting, setSelectedMeeting] = useState<number>();
    const [requestedRefresh, setRequestedRefresh] = useState<number>(0);

    const profileRoute = useRoute<RouteProp<ProfileStackParams, "Profile">>();
    const profileRouteId = profileRoute?.params?.params?.id; //Błąd autocomplete

    useEffect(() => {
      setDialogVisible(false);
    }, [useIsFocused()]);

    const logOut = async () => {
      if (onLogout) {
        await onLogout();
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Home" }]
          })
        );
      }
    };

    const addNote = async (meetingId: number) => {
      const response = await MeetingApi.addNote(meetingId, note!);
      if (!response || response.status != 200)
        return;

      nav.navigate("Notes", { meetingId: meetingId });
    };

    const cancelMeeting = async (meetingId: number) => {
      await MeetingApi.cancelMeeting(meetingId);
      setMeetings(meetings?.filter((meeting) => meeting.id != meetingId));
    };

    useEffect(() => {
      const fetchData = async () => {
        const userWithHisMeetings = await UserApi.getUserWithHisMeetings(profileRouteId);
        setMeetings(userWithHisMeetings[0]);
        setUser(userWithHisMeetings[1]);
      };
      fetchData().catch(console.error);
    }, [useIsFocused(), requestedRefresh]);

    useEffect(() => {
      const fetchData = async () => {
        const meetings = await UserApi.getUserMeetings(selectedIndex, profileRouteId);
        setMeetings(meetings);
      };
      fetchData().catch(console.error);
    }, [selectedIndex]);

    const nav = useNavigation<NativeStackNavigationProp<ProfileStackParams, "Profile">>();
    return (
      <View style={styles.container}>
        <TopBackNavigation
          title={user?.nickname}
          isLogoutButtonVisible={authState?.userId == user?.id}
          onLogoutButtonPressed={async () => await logOut()}
          onEditButtonPressed={() => navigation.navigate("EditUserInformation",
            {
              additionalInfo: {
                firstName: user?.firstName,
                lastName: user?.lastName,
                achievements: user?.achievements,
                activityStatus: user?.activityStatus,
                trainingSince: user?.trainingSince
              } as UserAdditionalInfo
            })}
        />
        <View style={{ padding: 12 }}>
          {user?.firstName && (
            <Text style={styles.status}>Imie: {user.firstName}</Text>
          )}
          {user?.lastName && (
            <Text style={styles.status}>Nazwisko: {user.lastName}</Text>
          )}
          {user?.trainingSince && (
            <Text style={styles.status}>Trenuje od: {TimeFormatter.formatToMonthDayAndYear(user.trainingSince)}</Text>
          )}
          {user?.achievements && (
            <Text style={styles.status}>Osiągnięcia: {user.achievements?.split(",").join(", ")}</Text>
          )}
          <View style={{ marginBottom: 12 }}>
            <Text style={styles.status}>Status gry użytkownika: {EnumMapper.MapStatus(user?.activityStatus!)}</Text>
          </View>
          {
            authState?.role == Role.Admin.toString() && user?.id != authState.userId &&
            < View>
              <MyButton
                title={!user?.isBanned ? "Zablokuj użytkownika" : "Odblokuj użytkownika"}
                onPress={async () => {
                  !user?.isBanned
                    ? await UserApi.banUser(user?.id!)
                    : await UserApi.unbanUser(user?.id!);
                  setRequestedRefresh((prevState) => prevState + 1);
                }}
                backgroundColor={"red"}
              />
            </View>
          }
          <View style={styles.meetingsPicker}>
            <MeetingsPicker onIndexChanged={(index) => setSelectedIndex(index)} />
          </View>
          <View>
            <FlatList data={meetings}
                      keyExtractor={(item, index) => {
                        return item.id.toString();
                      }}
                      renderItem={itemData => {
                        return (
                          <MeetingOverviewView
                            key={itemData.item.id}
                            {...itemData.item}
                            userId={user?.id}
                            menuOptions={
                              <MenuOptions>
                                {
                                  selectedIndex == 0 && new Date(itemData.item.end) > new Date() &&
                                  <View style={styles.options}>
                                    <MenuOption
                                      onSelect={
                                        async () => {
                                          await cancelMeeting(itemData.item.id);
                                        }}
                                    >
                                      <Text style={styles.status}>Odwolaj</Text>
                                    </MenuOption>
                                  </View>
                                }
                                {
                                  selectedIndex == 1 &&
                                  <View style={styles.options}>
                                    <MenuOption onSelect={async () => {
                                      const result = await MeetingApi.markParticipation(itemData.item.id);
                                      if (result)
                                        setMeetings(meetings?.filter((meeting) => meeting.id != itemData.item.id));
                                      else
                                        Alert.alert("Nie możesz zrezygnować z udziału we własnym treningu");
                                    }}>
                                      <Text style={styles.status}>Zrezygnuj z udziału</Text>
                                    </MenuOption>
                                  </View>
                                }
                                {
                                  selectedIndex == 2 &&
                                  <View style={styles.options}>
                                    <MenuOptions>
                                      <MenuOption onSelect={() => {
                                        setSelectedMeeting(itemData.item.id);
                                        setDialogVisible(true);
                                      }}>
                                        <Text
                                          style={styles.status}
                                          disabled={!note || note.length <= 0}
                                        >
                                          Utwórz notatkę
                                        </Text>
                                      </MenuOption>
                                      <MenuOption onSelect={() => {
                                        nav.navigate("Notes", { meetingId: itemData.item.id });
                                        // await addNote(itemData.item.id);
                                      }}>
                                        <Text style={styles.status}>Zobacz wspólne notatki</Text>
                                      </MenuOption>
                                    </MenuOptions>
                                  </View>
                                }
                              </MenuOptions>
                            }
                          />
                        );
                      }}
            />
          </View>
        </View>
        <DialogBox
          title={"Dodaj notatke"}
          description={"Wpisz co chcesz dodać jako notatka z treningu"}
          label={"Dodaj"}
          isVisible={dialogVisible}
          onDialogVisible={(isVisible) => setDialogVisible(isVisible)}
          children={
            <MyInput
              placeholder={"Wpisz notatke"}
              multiline={true}
              onChangeText={(text) => setNote(text)}
            />
          }
          onPress={async () => addNote(selectedMeeting!)}
        />
      </View>
    );
  }
;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background["500"]
  },
  meetingsPicker: {
    alignItems: "center",
    paddingVertical: 12
  },
  status: {
    color: "white",
    fontFamily: FONTS.secondary.medium
  },
  options: {
    backgroundColor: COLORS.background["300"],
    padding: 8
  }
});
