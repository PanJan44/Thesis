import { StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProfileStackParams } from "../../core/navigation/types/navigation.types";
import { COLORS, FONTS } from "../../styles";
import { TopBackNavigation } from "../../components/topBackNavigation/topBackNavigation";
import MyInput from "../../components/myInput/myInput";
import { MyDropDownSelect } from "../../components/myDropDownSelect/myDropDownSelect";
import MyButton from "../../components/myButton/myButton";
import { useState } from "react";
import { TimeFormatter } from "../../core/timeFormatter";
import { MyModal } from "../../components/myModal/myModal";
import { MyCalendarPicker } from "../../components/calendarPicker/myCalendarPicker";
import { UserApi } from "../profileScreen/user.api";
import { EnumMapper } from "../../core/enumMapper";

type Props = NativeStackScreenProps<ProfileStackParams, "EditUserInformation">
const status = ["Aktywny", "Nieaktywny", "Kontuzjowany"];

export const EditUserInformationScreen = ({ navigation, route }: Props) => {
  const { additionalInfo } = route.params;

  const [calendarModalVisible, setCalendarModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(additionalInfo.trainingSince);
  const [firstName, setFirstName] = useState(additionalInfo.firstName);
  const [lastName, setLastName] = useState(additionalInfo.lastName);
  const [achievements, setAchievements] = useState(additionalInfo.achievements);
  const [selectedStatus, setSelectedStatus] = useState<string>(EnumMapper.MapStatus(additionalInfo.activityStatus));

  const calendarPicker = () => {
    return (
      <MyCalendarPicker
        onDateChange={(date) => {
          setSelectedDate(date.toDate());
        }}
        minDate={undefined}
        restrictMonthNavigation={true}
        maxDate={new Date()}
      />);
  };

  return (
    <View style={styles.container}>
      <TopBackNavigation title={"Edycja profilu"} />
      <View style={{ alignItems: "center", justifyContent: "center", padding: 8 }}>
        <View style={styles.inputAndTextWrapper}>
          <Text style={styles.text}>Imie</Text>
          <MyInput
            value={firstName}
            placeholder={"Imie"}
            onChangeText={(text) => setFirstName(text)}
          />
        </View>
        <View style={styles.inputAndTextWrapper}>
          <Text style={styles.text}>Nazwisko</Text>
          <MyInput
            value={lastName}
            placeholder={"Nazwisko"}
            onChangeText={(text) => setLastName(text)}
          />
        </View>
        <View style={styles.inputAndTextWrapper}>
          <Text style={styles.text}>Osiągnięcia (oddzielone przecinkiem)</Text>
          <MyInput
            value={achievements}
            placeholder={"Osiągnięcia"}
            multiline={true}
            onChangeText={(text) => setAchievements(text)}
          />
        </View>
        <View style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.text}>Twój status</Text>
            <MyDropDownSelect
              title={selectedStatus}
              data={status}
              onSelect={(selectedItem) => {
                setSelectedStatus(selectedItem);
              }}
            />
          </View>
          <View>
            <Text style={styles.text}>Trenuje od</Text>
            <MyButton
              backgroundColor={COLORS.background["300"]}
              title={TimeFormatter.formatToMonthDayAndYear(selectedDate) ?? "Wybierz date"}
              onPress={() => setCalendarModalVisible(true)}
            />
          </View>
        </View>
      </View>
      <View style={styles.sentButton}>
        <MyButton
          backgroundColor={COLORS.primary["300"]}
          title={"Wyślij"}
          onPress={async () => {
            await UserApi.editUserInformation(selectedDate, achievements, firstName, lastName, selectedStatus);
            navigation.goBack();
          }}
          customStyle={{ paddingHorizontal: 100 }}
        />
      </View>
      <MyModal
        modalVisibleProp={calendarModalVisible}
        customElement={[calendarPicker()]}
        onModalVisibleChange={(isVisible) => {
          setCalendarModalVisible(isVisible);
        }}
        title={"dzień"}
        key={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background["500"]
  },
  text: {
    color: "white",
    fontFamily: FONTS.primary.bold,
    paddingVertical: 4
  },
  inputAndTextWrapper: {
    width: "100%",
    marginBottom: 12
  },
  sentButton: {
    position: "absolute",
    right: 0,
    left: 0,
    bottom: 20,
    alignItems: "center",
    justifyContent: "center"
  }
});
