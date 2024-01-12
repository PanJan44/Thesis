import { FlatList, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { GroupedNotes, Note } from "../../shared/types/shared.types";
import MeetingApi from "../../components/meeting/api/meeting.api";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProfileStackParams } from "../../core/navigation/types/navigation.types";
import { COLORS, FONTS } from "../../styles";
import { TopBackNavigation } from "../../components/topBackNavigation/topBackNavigation";

type Props = NativeStackScreenProps<ProfileStackParams, "Notes">;
export const MeetingNotesScreen = ({ navigation, route }: Props) => {
    const [groupedNotes, setGroupedNotes] = useState<GroupedNotes[] | null>();

    useEffect(() => {
      const fetchData = async () => {
        const notes = await MeetingApi.getNotes(route.params.meetingId);
        setGroupedNotes(notes);
      };
      fetchData().catch(console.error);
    }, [route.params.meetingId]);

    const notes = (items: Note[]) => {
      return (
        <View>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id.toString()}
            renderItem={itemData => {
              return (
                <View>
                  <Text
                    style={styles.note}
                  >
                    {itemData.item.content}
                  </Text>
                </View>
              );
            }
            }
          />
        </View>
      );
    };

    return (
      <View style={styles.container}>
        <TopBackNavigation
          title={"Notatki z treningu"}
        />
        <View style={{ padding: 8 }}>
          <FlatList
            data={groupedNotes}
            keyExtractor={(item) => item.authorId.toString()}
            renderItem={itemData => {
              return (
                <View style={{ paddingVertical: 8 }}>
                  <View style={styles.nicknameWrapper}>
                    <Text
                      style={styles.nickname}
                    >{itemData.item.nickname}
                    </Text>
                  </View>
                  <View>
                    {notes(itemData.item.notes)}
                  </View>
                </View>
              );
            }}
          />
        </View>
      </View>
    )
      ;
  }
;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background["500"]
  },
  note: {
    fontFamily: FONTS.secondary.medium,
    color: "white"
  },
  nickname: {
    fontFamily: FONTS.primary.bold,
    color: "white",
    textTransform: "uppercase"
  },
  nicknameWrapper: {}

});
