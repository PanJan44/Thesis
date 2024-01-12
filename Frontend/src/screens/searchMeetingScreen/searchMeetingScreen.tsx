import { Alert, Animated, Button, Modal, PermissionsAndroid, Pressable, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParams, RootStackParams } from "../../core/navigation/types/navigation.types";
import { COLORS, FONTS } from "../../styles";
import { PlaceSearchingInput } from "../../components/placeSearchingInput/placeSearchingInput";
import { SimpleButton } from "../../components/simpleButton/simpleButton";
import { useMemo, useState } from "react";
import { RadioGroup, RadioButton, RadioButtonProps } from "react-native-radio-buttons-group";
import { MyModal } from "../../components/myModal/myModal";
import { TimeFormatter } from "../../core/timeFormatter";
import { MyCalendarPicker } from "../../components/calendarPicker/myCalendarPicker";
import MyButton from "../../components/myButton/myButton";
import { GetMeetingsInDistance } from "../../shared/types/shared.types";
import { TopBackNavigation } from "../../components/topBackNavigation/topBackNavigation";
import Geolocation, { GeolocationConfiguration } from "@react-native-community/geolocation";
import { date } from "yup";

type Props = NativeStackScreenProps<HomeStackParams, "SearchMeeting">;
const distances = [0, 1, 3, 5, 10, 20];
const config = {
  authorizationLevel: "whenInUse", // or 'always'
  skipPermissionRequests: false,    // Whether to automatically request permissions
  authorizationPrompt: {
    title: "Location Services",
    message: "This app requires access to your location.",
    cancelButtonTitle: "Cancel",
    settingsButtonTitle: "Settings"
  }
} as GeolocationConfiguration;
Geolocation.setRNConfiguration(config);

export const SearchMeetingScreen = ({ navigation }: Props) => {
  const [distanceModalVisible, setDistanceModalVisible] = useState(false);
  const [calendarModalVisible, setCalendarModalVisible] = useState(false);
  const [distance, setDistance] = useState(0);
  const [selectedId, setSelectedId] = useState<string>("0");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [place, setPlace] = useState<{ lat: number | undefined, lng: number | undefined }>(
    { lat: undefined, lng: undefined });

  const setDistanceAndLeave = (id: string) => {
    setSelectedId(id);
    setDistance(distances[Number(id)]);
  };

  const radioDistancePicker = () => {
    return (
      <View style={styles.radioContainer}>
        {distances.map((item, index) => (
          <RadioButton
            id={index.toString()}
            key={index.toString()}
            value={item.toString()}
            label={`w promieniu +${item} km`}
            color={COLORS.primary["300"]}
            onPress={setDistanceAndLeave}
            selected={selectedId === index.toString()}
            labelStyle={styles.labelStyle}
          />
        ))}
      </View>
    );
  };

  const calendarPicker = () => {
    return (
      <MyCalendarPicker onDateChange={(date) => {
        setSelectedDate(date.toDate());
      }}
                        minDate={new Date()}
      />);
  };

  return (
    <View style={styles.container}>
      <TopBackNavigation
        title={"Wyszukaj"}
        onBackButtonPressed={() => {
          navigation.navigate("Home", { searchMeetingsParams: null });
        }}
      />
      <View style={{ padding: 4, flex: 1 }}>
        <View>
          <PlaceSearchingInput
            onSearch={(place, details) => {
              setPlace({ lat: details?.geometry.location.lat, lng: details?.geometry.location.lng });
            }}
            autoFocus={true}
          />
        </View>
        <View style={styles.filterButtons}>
          <SimpleButton
            text={`w promieniu: +${distance} km`}
            onPress={() =>
              setDistanceModalVisible(true)}
          />
          <SimpleButton
            text={"Dnia: " + TimeFormatter.formatToDayOnly(selectedDate)}
            onPress={() => setCalendarModalVisible(true)}
          />
        </View>
        <MyModal
          modalVisibleProp={distanceModalVisible}
          customElement={[radioDistancePicker()]}
          onModalVisibleChange={(isVisible) => {
            setDistanceModalVisible(isVisible);
          }}
          title={"dystans"}
        />
        <MyModal
          modalVisibleProp={calendarModalVisible}
          customElement={[calendarPicker()]}
          onModalVisibleChange={(isVisible) => {
            setCalendarModalVisible(isVisible);
          }}
          title={"dzień"}
        />
        <View style={styles.searchButtonWrapper}>
          <MyButton
            customStyle={styles.searchButton}
            disabled={place.lat === undefined || place.lng === undefined}
            backgroundColor={COLORS.primary["300"]}
            title={"szukaj"}
            onPress={() => {
              const searchMeetingParams: GetMeetingsInDistance =
                {
                  lat: place.lat!,
                  lon: place.lng!,
                  radius: distance,
                  when: selectedDate.toISOString()
                };
              navigation.navigate("Home", { searchMeetingsParams: searchMeetingParams });
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background["500"]
    // alignItems: "center"
  },

  filterButtons: {
    // display: "flex",
    marginTop: 60,
    flexDirection: "row",
    justifyContent: "space-between"
  },

  distanceContent: {
    backgroundColor: "red",
    marginBottom: 5
  },
  radioContainer: {
    alignItems: "center",
    marginLeft: 50,
    marginTop: 50
  },

  labelStyle: {
    flexDirection: "row",
    fontSize: 16,
    fontFamily: FONTS.secondary.medium,
    marginLeft: 24,
    flex: 1,
    paddingHorizontal: 40
  },

  searchButtonWrapper: {
    textTransform: "uppercase",
    position: "absolute",
    right: 0,
    left: 0,
    bottom: 20,
    alignItems: "center",
    justifyContent: "center"
  },

  searchButton: {
    paddingHorizontal: 100
  },

  radioButtonsContainer: {
    backgroundColor: "red",
    flex: 1
  }
});
