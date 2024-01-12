import { Alert, Button, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LoginStackParams, RootStackParams } from "../../core/navigation/types/navigation.types";
import { COLORS, FONTS } from "../../styles";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addMeetingValidationSchema } from "../validation.schema";
import ImagePicker from "../../components/imagePicker/imagePicker";
import { useEffect, useState } from "react";
import { ImagePickerResponse } from "react-native-image-picker";
import MyButton from "../../components/myButton/myButton";
import MyInput from "../../components/myInput/myInput";
import { PlaceSearchingInput } from "../../components/placeSearchingInput/placeSearchingInput";
import { Address } from "../../shared/types/shared.types";
import { GooglePlaceData, GooglePlaceDetail } from "react-native-google-places-autocomplete";
import { SimpleButton } from "../../components/simpleButton/simpleButton";
import { TopBackNavigation } from "../../components/topBackNavigation/topBackNavigation";
import { MyModal } from "../../components/myModal/myModal";
import { MyCalendarPicker } from "../../components/calendarPicker/myCalendarPicker";
import { TimeFormatter } from "../../core/timeFormatter";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import meetingApi from "../../components/meeting/api/meeting.api";
import { AddMeeting } from "../../components/meeting/types/meeting.type";
import { useAuth } from "../../context/AuthContext";

type Props = NativeStackScreenProps<RootStackParams, "AddMeeting">;

const defaultValues = {
  title: "", description: "", startTime: new Date(), endTime: new Date(),
  startDay: new Date(), endDay: new Date()
};

const AddMeetingScreen = ({ navigation }: Props) => {
  const [selectedImage, setSelectedImage] = useState<ImagePickerResponse>();
  const [address, setAddress] = useState<Address>();
  const [calendarModalVisible, setCalendarModalVisible] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState<Date>(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState<Date>(new Date());
  const [start, setStart] = useState<boolean>(false);
  const [timePickerVisible, setTimePickerVisible] = useState<boolean>(false);
  const auth = useAuth();

  const { handleSubmit, control, formState: { errors, isValid, isDirty, touchedFields } }
    = useForm(
    {
      mode: "onChange",
      resolver: yupResolver(addMeetingValidationSchema),
      defaultValues
    }
  );

  const calendarPicker = (start: boolean) => {
    return (
      <MyCalendarPicker
        key={1}
        onDateChange={(date) => {
          start ? setSelectedStartDate(date.toDate()) : setSelectedEndDate(date.toDate());
          setTimeout(() => setTimePickerVisible(true), 100);
        }}
        minDate={new Date()}
      />);
  };

  const setDate = (start: boolean, date: Date) => {
    start ?
      setSelectedStartDate(TimeFormatter.formatFromPartsToFullDate(selectedStartDate, date))
      : setSelectedEndDate(TimeFormatter.formatFromPartsToFullDate(selectedEndDate, date));
  };

  const setPlace = (place: GooglePlaceData, details: GooglePlaceDetail) => {
    const address: Address = {
      PlaceId: place.place_id,
      StreetNumber: details.address_components.find(a => a.types.includes("street_number"))?.long_name,
      StreetName: details.address_components.find(a => a.types.includes("route"))?.long_name,
      City: details.address_components.find(a => a.types.includes("locality"))!.long_name,
      Latitude: details.geometry.location.lat,
      Longitude: details.geometry.location.lng,
      PlaceUrl: details.url,
      PlaceName: details.name
    };

    setAddress(address);
  };

  const onSubmit = async (data: any) => {
    const meeting: AddMeeting = {
      address: address!,
      start: selectedStartDate,
      end: selectedEndDate,
      title: data.title,
      description: data.description
    };

    const pictureBase64String = selectedImage?.assets?.[0].base64;
    if (!pictureBase64String)
      meeting.pictureBase64 = null;
    else
      meeting.pictureBase64 = `data:image/jpeg;pictureBase64String,${pictureBase64String}`;

    const response = await meetingApi.createMeeting(meeting);
    if (response)
      navigation.navigate("MyProfile", {});
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        {
          auth.authState?.banStatus ? (
              <View>
                <TopBackNavigation title={"Utwórz trening"} />
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 12
                  }}
                >
                  <Text
                    style={
                      {
                        fontFamily: FONTS.primary.bold,
                        color: "white",
                        textTransform: "uppercase"
                      }
                    }>Wygląda na to, że jesteś zablokowany. Skontaktuj się z administratorem, żeby wyjaśnić tę sytuację</Text>
                </View>
              </View>
            ) :
            (
              <View>
                <TopBackNavigation title={"Utwórz trening"} />
                <ImagePicker
                  customElement={
                    <View style={styles.imagePicker}>
                      {
                        selectedImage ?
                          <View>
                            <View style={styles.removeButton}>
                              <MyButton
                                backgroundColor={COLORS.primary["300"]}
                                title={"Usuń"}
                                onPress={() => setSelectedImage(undefined)}
                              />
                            </View>
                            <Image
                              source={{ uri: selectedImage.assets?.[0]?.uri }}
                              style={[styles.logoImage, { opacity: 1 }]}
                            />
                          </View>
                          :
                          <Image
                            source={require("../../../assets/images/logoFull.png")}
                            style={[styles.logoImage, { opacity: 0.5 }]}
                          />
                      }
                      <View style={styles.pickPhotoWrapper}>
                        <Text style={styles.pickPhotoText}>
                          Wybierz zdjęcie
                        </Text>
                      </View>
                    </View>
                  }
                  onSelectedImage={
                    (selectedImage) => {
                      setSelectedImage(selectedImage);
                    }
                  }
                />

                <View style={styles.inputWrapper}>
                  <Text style={styles.label}>Miejsce treningu*</Text>
                  <View style={{ marginBottom: 50, marginTop: 2 }}>
                    <PlaceSearchingInput
                      onSearch={(place, details) => {
                        setPlace(place, details!);
                      }}
                    />
                  </View>
                  <Text style={styles.label}>Tytuł treningu*</Text>
                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <MyInput
                        placeholder={"Tytuł"}
                        onChangeText={value => onChange(value)}
                      />
                    )}
                    name="title"
                  />
                  <Text style={styles.label}>Opis</Text>
                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <MyInput
                        placeholder={"Opis"}
                        onChangeText={value => onChange(value)}
                        multiline={true}
                        maxLength={200}
                      />
                    )}
                    name="description"
                  />
                  <Text style={styles.label}>Kiedy</Text>
                  <View style={styles.timePicker}>
                    <SimpleButton
                      text={"Od " + TimeFormatter.formatToDayAndTime(selectedStartDate)}
                      onPress={() => {
                        setCalendarModalVisible(true);
                        setStart(true);
                      }
                      }
                    />
                    <SimpleButton
                      text={"Do " + TimeFormatter.formatToDayAndTime(selectedEndDate)}
                      onPress={() => {
                        setCalendarModalVisible(true);
                        setStart(false);
                      }
                      } />
                  </View>
                </View>
                <MyModal
                  modalVisibleProp={calendarModalVisible}
                  customElement={[calendarPicker(start)]}
                  onModalVisibleChange={(isVisible) => {
                    setCalendarModalVisible(isVisible);
                  }}
                  title={"dzień"}
                />
                {
                  timePickerVisible &&
                  <RNDateTimePicker
                    value={new Date()}
                    mode={"time"}
                    is24Hour={true}
                    positiveButton={{ label: "Ok", textColor: COLORS.primary["300"] }}
                    negativeButton={{ label: "Wyjdź", textColor: COLORS.primary["100"] }}
                    onChange={(e, date) => {
                      setTimePickerVisible(false);
                      setDate(start, date!);
                    }}
                  />
                }
              </View>
            )
        }
        {
          !auth.authState?.banStatus ?
            <View style={styles.createButton}>
              <MyButton
                backgroundColor={COLORS.primary["300"]}
                title={"Utwórz"}
                onPress={handleSubmit(onSubmit)}
                disabled={!isDirty || !isValid || selectedStartDate >= selectedEndDate || !address}
              />
            </View> : undefined
        }
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background["500"]
  },

  imagePicker: {
    width: "100%"
  },

  logoImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 8
  },
  pickPhotoWrapper: {
    position: "absolute",
    top: "90%",
    left: "35%"
  },
  pickPhotoText: {
    color: COLORS.primary["300"],
    fontFamily: FONTS.primary.bolder,
    opacity: 1,
    fontSize: 18
  },
  removeButton: {
    width: 100,
    top: 5,
    left: "75%",
    position: "absolute",
    zIndex: 1
  },
  label: {
    color: "white",
    fontSize: 14,
    fontFamily: FONTS.primary.bold,
    paddingVertical: 4,
    marginTop: 4
  },
  inputWrapper: {
    padding: 10
  },
  createButton: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 10
  },
  timePicker: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

export default AddMeetingScreen;
