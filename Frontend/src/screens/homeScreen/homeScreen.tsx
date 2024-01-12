import { Alert, FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import { COLORS, FONTS } from "../../styles";
import MeetingTile from "../../components/meeting/meetingTile";
import MeetingApi from "../../components/meeting/api/meeting.api";
import { useEffect, useState } from "react";
import { Meeting } from "../../components/meeting/types/meeting.type";
import { SearchTemplateButton } from "../../components/searchTemplateButton/searchTemplateButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParams } from "../../core/navigation/types/navigation.types";
import Geolocation, { GeolocationResponse } from "@react-native-community/geolocation";
import { useAuth } from "../../context/AuthContext";
import { GetMeetingsInDistance } from "../../shared/types/shared.types";

type Props = NativeStackScreenProps<HomeStackParams, "Home">;
const HomeScreen = ({ route, navigation }: Props) => {
  const searchMeetingsParams = route.params?.searchMeetingsParams;

  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [position, setPosition] = useState<GeolocationResponse>();
  const [pageNumber, setPageNumber] = useState(1);
  const [searchParams, setSearchParams] = useState<GetMeetingsInDistance>(searchMeetingsParams);
  const { authState } = useAuth();
  const pageSize = 5;

  const fetchMeetings = async () => {
    if (searchMeetingsParams) {
      const searchingParams: GetMeetingsInDistance = {
        pageSize: pageSize,
        pageNumber: pageNumber,
        lat: searchMeetingsParams.lat,
        lon: searchMeetingsParams.lon,
        when: searchMeetingsParams.when,
        radius: searchMeetingsParams.radius
      };

      setSearchParams(searchingParams);

      let fetchedMeetings = await MeetingApi.getMeetingsInDistance(searchingParams);
      if (pageNumber > 1)
        setMeetings((prevState) => [...prevState, ...fetchedMeetings]);
      else
        setMeetings((prevState) => prevState = fetchedMeetings);

      setRefreshing(false);
    } else {
      Geolocation.getCurrentPosition(async position => {
          const searchingParams = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            radius: 10,
            when: new Date().toISOString(),
            pageNumber: pageNumber,
            pageSize: pageSize
          };
          setSearchParams(searchingParams);
          let fetchedMeetings = await MeetingApi.getMeetingsInDistance(searchingParams);
          setPosition(position);
          if (pageNumber > 1)
            setMeetings((prevState) => [...prevState, ...fetchedMeetings]);
          else
            setMeetings((prevState) => prevState = fetchedMeetings);
          setRefreshing(false);
        },
        error => {
          Alert.alert("Nie udało się pobrać lokalizacji");
        },
        { enableHighAccuracy: true, timeout: 300000 }
      );
    }
  };

  useEffect(() => {
    const fetch = async () => {
      setPageNumber((prevState) => prevState = 1); //żeby przy nowym wyszukaniu zaczynać od 1. strony
      await fetchMeetings();
    };
    fetch().catch();
  }, [searchMeetingsParams, authState]); //tu było jeszcze authState

  const participateInMeeting = async (id: number) => {
    const result = await MeetingApi.markParticipation(id);
    if (result) {
      setMeetings(currentMeetings => {
        return currentMeetings.map(meeting => {
          if (meeting.id === id) {
            return { ...meeting, isCurrentUserParticipating: result.isCurrentUserParticipating, participantsCount: result.participantsCount };
          }
          return meeting;
        });
      });
    }
  };

  return (
    <View style={styles.container}>
      <SearchTemplateButton onPress={() => navigation.navigate("SearchMeeting")} />
      <View style={{ marginBottom: 16 }}>
        {
          meetings.length != 0 ?
            <View style={{ flex: 1 }}>
              <FlatList data={meetings} renderItem={itemData => {
                return (
                  <MeetingTile
                    {...itemData.item}
                    onParticipate={() => participateInMeeting(itemData.item.id)}
                    onUserPressed={() => {
                      navigation.navigate("ProfileStack", { screen: "Profile", params: { id: itemData.item.organizer.id } });
                    }}
                  />
                );
              }}
                        keyExtractor={(item, index) => {
                          return item.id.toString();
                        }}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={async () => {
                          const pos = { lat: position?.coords.latitude, lon: position?.coords.longitude, radius: 10, when: new Date().toISOString() };
                          if (pos.lat && pos.lon && !searchMeetingsParams)
                            setMeetings(await MeetingApi.getMeetingsInDistance(pos));
                          else
                            setMeetings(await MeetingApi.getMeetingsInDistance(searchMeetingsParams!));
                        }} />}
                        onEndReached={async () => {
                          await fetchMeetings();
                          setPageNumber((prevState) => prevState + 1);
                        }}
                        onEndReachedThreshold={0.1}
              />
            </View>
            :
            <Text style={styles.noResults}>Nie znaleziono pasujących wyników</Text>
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      backgroundColor: COLORS.background["500"],
      alignItems: "center"
    },

    noResults: {
      fontFamily: FONTS.secondary.medium,
      fontSize: 16,
      zIndex: -1,
      marginTop: 20
    }
  }
);

export default HomeScreen;
