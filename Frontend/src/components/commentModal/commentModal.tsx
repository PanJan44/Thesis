import { FlatList, NativeSyntheticEvent, StyleSheet, TextInputSubmitEditingEventData, View } from "react-native";
import CommentView from "../comment/comment";
import MyInput from "../myInput/myInput";
import { useAuth } from "../../context/AuthContext";
import React, { useState } from "react";
import { Comment } from "../meeting/types/meeting.type";
import { MyModal } from "../myModal/myModal";
import MeetingApi from "../meeting/api/meeting.api";

type Props = {
  comments: Comment[];
  modalVisibleProp: boolean;
  onModalVisibleChange: (isVisible: boolean) => void;
  inputCommentFocus: boolean;
  onPostComment: (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void;
  onCommentType: (newText: string) => void;
  commentContent: string;
  onCommentRemove?: () => void;
}
export const CommentModal = ({
                               commentContent,
                               onCommentType,
                               comments,
                               onModalVisibleChange,
                               onPostComment,
                               modalVisibleProp,
                               inputCommentFocus,
                               onCommentRemove
                             }: Props) => {
  const { authState } = useAuth();

  const commentsView = () => {
    return (
      <View style={{ marginTop: 10, height: "90%" }} key={1}>
        <FlatList
          data={comments} renderItem={itemData => {
          return (
            <CommentView
              {...itemData.item}
              onRemoveComment={onCommentRemove}
            />
          );
        }}
        />
      </View>
    );
  };

  const inputInComments = () => {
    return (
      authState?.authenticated ?
        <View key={2} style={styles.inputWrapper}>
          <MyInput
            value={commentContent}
            placeholder={"Napisz komentarz"}
            editable={!authState.banStatus}
            onChangeText={onCommentType}
            onSubmitEditing={onPostComment}
            autoFocus={inputCommentFocus}
            blurOnSubmit={true}
            multiline={true}
          />
        </View>
        : undefined
    );
  };

  return (
    <MyModal
      modalVisibleProp={modalVisibleProp}
      customElement={[commentsView(), inputInComments()]}
      onModalVisibleChange={onModalVisibleChange}
      title={"komentarze"}
    />
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    position: "absolute",
    bottom: -10,
    width: "100%"
  }
});
