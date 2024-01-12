import { Button, FlatList, Image, Linking, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { COLORS, FONTS } from "../../styles";
import { ParticipateIcon } from "../../../assets/icons/ParticipateIcon";
import { CommentIcon } from "../../../assets/icons/CommentIcon";
import { Comment, Meeting } from "./types/meeting.type";
import { useAuth } from "../../context/AuthContext";
import { TimeFormatter } from "../../core/timeFormatter";
import MeetingApi from "./api/meeting.api";
import { useEffect, useState } from "react";
import { CommentModal } from "../commentModal/commentModal";
import { ParticipantsModal } from "../participantsModal/participantsModal";
import { User } from "../../shared/types/shared.types";
import { useIsFocused } from "@react-navigation/native";
import { TruncatedText } from "../truncatedText/truncatedText";
import comment from "../comment/comment";

type Props = {
  onParticipate: (id: number) => void,
  onUserPressed: () => void,
}
const MeetingTile = (
  {
    title, id, description, start, end, participantsCount,
    commentsCount, organizer, image, location,
    isCurrentUserParticipating, onParticipate,
    onUserPressed
  }: Meeting & Props) => {
  const date = new Date(start);
  const { authState } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [participantsModalVisible, setParticipantsModalVisible] = useState(false);
  const [participants, setParticipants] = useState<User[]>([]);
  const [inputCommentFocus, setInputCommentFocus] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [currentCommentsCount, setCurrentCommentsCount] = useState(commentsCount);

  useEffect(() => {
    setCommentModalVisible(false);
    setParticipantsModalVisible(false);
  }, [useIsFocused()]);

  const mapParticipationColors = (): string => {
    if (!authState?.authenticated)
      return "gray";

    return isCurrentUserParticipating ? COLORS.primary["300"] : "white";
  };

  const getComments = async (id: number) => {
    const result = await MeetingApi.getMeetingComments(id);
    setComments(result);
    setCommentModalVisible(true);
  };

  const postComment = async (meetingId: number) => {
    if (commentContent.length <= 0)
      return;

    const comment = await MeetingApi.addComment(meetingId, commentContent);
    if (comment == null) {
      return;
    }

    setCommentContent("");
    setComments((prevComments) => [comment, ...prevComments]);
    setCurrentCommentsCount(currentCommentsCount + 1);
  };

  const getParticipants = async (id: number) => {
    const result = await MeetingApi.getParticipants(id);
    if (result == null)
      return;

    setParticipants(result);
    setParticipantsModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.organizer}>
        <Pressable onPress={onUserPressed}>
          <Text style={styles.organizerText}>{organizer.nickname}</Text>
        </Pressable>
      </View>
      <View style={{ alignItems: "center", paddingVertical: 4 }}>
        {
          image ?
            <Image source={{ uri: `data:${image?.contentType};base64,${image?.file}` }} style={styles.image} />
            :
            <Image source={require("../../../assets/images/logoFull.png")} style={styles.image} />
        }
      </View>
      <View style={styles.titleAndDate}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.date}>{TimeFormatter.formatToDayAndTime(date)}</Text>
      </View>
      <Pressable
        onPress={() => Linking.openURL(location.placeUrl)}
        style={{ marginBottom: 8 }}
      >
        <TruncatedText
          text={location.placeName}
          maxLength={50}
          style={styles.addressText}
        />
        <TruncatedText
          text={`${location.city} ${location?.streetName ?? ""} ${location?.streetNumber ?? ""}`}
          maxLength={40}
          style={[styles.addressText, { color: COLORS.lightFont }]}
        >
          {location.city} {location.streetName} {location.streetNumber}
        </TruncatedText>
      </Pressable>
      {
        description &&
        <Text style={styles.descText}>{description}</Text>
      }
      <View style={styles.iconsWrapper}>
        <TouchableOpacity
          onPress={() => onParticipate(id)}
          disabled={!authState?.authenticated}
        >
          <ParticipateIcon color={mapParticipationColors()} />
        </TouchableOpacity>
        <View style={styles.counterWrapper}>
          <TouchableOpacity
            onPress={() => getParticipants(id)}
          >
            <Text style={styles.counterText}>{participantsCount}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginRight: 6 }}></View>
        <TouchableOpacity
          onPress={() => {
            getComments(id);
            setInputCommentFocus(true);
          }}
          // disabled={!authState?.authenticated}
        >
          <View style={styles.counterWrapper}>
            <CommentIcon color={authState?.authenticated ? "white" : "gray"} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            getComments(id);
            setInputCommentFocus(false);
          }}
        >
          <Text style={styles.counterText}>{currentCommentsCount}</Text>
        </TouchableOpacity>
      </View>
      <CommentModal
        comments={comments}
        commentContent={commentContent}
        onCommentType={(newText) => setCommentContent(newText)}
        onPostComment={async () => await postComment(id)}
        inputCommentFocus={inputCommentFocus}
        onModalVisibleChange={(isVisible) => {
          setCommentModalVisible(isVisible);
        }}
        modalVisibleProp={commentModalVisible}
      />
      <ParticipantsModal
        participants={participants}
        modalVisibleProp={participantsModalVisible}
        onModalVisibleChange={(isVisible) => {
          setParticipantsModalVisible(isVisible);
        }} />
      <View style={styles.horizontalLine} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth: "95%",
    // backgroundColor: COLORS.secondary["500"],
    borderRadius: 16,
    padding: 6,
    borderBottomColor: "red"
  },

  organizer: {
    flexDirection: "row",
    paddingVertical: 4,
    backgroundColor: COLORS.background["500"],
    overflow: "visible"
  },

  organizerText: {
    fontFamily: FONTS.primary.bold,
    fontSize: 16,
    color: "white"
  },

  titleText: {
    fontFamily: FONTS.primary.bold,
    fontSize: 18,
    color: "white",
    textTransform: "uppercase"
  },

  image: {
    height: 200,
    width: "100%",
    resizeMode: "cover",
    borderRadius: 8
  },

  titleAndDate: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4
    // alignItems: "center",
  },
  date: {
    fontFamily: FONTS.secondary.light,
    fontSize: 12
  },

  addressText: {
    fontFamily: FONTS.secondary.medium,
    fontSize: 14,
    color: "white",
    textTransform: "uppercase",
    letterSpacing: 0.7
    // marginBottom: 2
  },

  descText: {
    fontFamily: FONTS.secondary.medium,
    fontSize: 14,
    color: "white"
  },

  iconsWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10
  },

  counterWrapper: {
    paddingHorizontal: 4
  },

  counterText: {
    fontFamily: FONTS.secondary.medium,
    color: "gray",
    fontSize: 14
  },

  counterIconWrapper: {
    paddingHorizontal: 4
  },

  horizontalLine: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightFont,
    borderTopColor: COLORS.lightFont,
    marginVertical: 10
  },
  placeAndLocation: {}
});

export default MeetingTile;
