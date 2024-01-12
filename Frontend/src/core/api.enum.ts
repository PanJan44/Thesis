// const backEndPrefix = "http://10.0.2.2:5265/api";
// const backEndPrefix = "http://localhost:5265/api";
const backEndPrefix = "http://192.168.0.153:5265/api";

export enum Api {
  //meeting
  MEETINGS_IN_DISTANCE = "/meeting/meetingsInDistance",
  PARTICIPATE = "/meeting/participate",
  GET_MEETING_COMMENTS = "/meeting/comments",
  ADD_COMMENT = "/meeting/addComment",
  GET_PARTICIPANTS = "/meeting/getParticipants",
  ADD_MEETING = "/meeting",
  GET_NOTES = "/meeting/getNotes",
  ADD_NOTE = "/meeting/addNote",
  CANCEL = "/meeting/cancel",
  GET_BY_ID = "/meeting/getMeeting",

  //user
  REGISTER = "/account/register",
  LOGIN = "/account/login",
  USER_ID = "/account/currentUserId",
  USER_ROLE = "/account/currentUserRole",
  USER_BAN_STATUS = "/account/currentUserBanStatus",
  GET_USER_WITH_ORGANIZED_MEETINGS = "/user/getUserWithOrganizedMeetings",
  GET_USER_ORGANIZED_MEETINGS = "/user/getUserOrganizedMeetings",
  GET_USER_TAKEN_PART_IN_MEETINGS = "/user/getUserTakenPartInMeetings",
  GET_USER_TAKING_PART_IN_MEETINGS = "/user/getUserTakingPartInMeetings",
  ADDITIONAL_INFORMATION = "/user/additionalInformation",
  REMOVE_COMMENT = "/user/removeUserComment",
  BAN_USER = "/user/banUser",
  UNBAN_USER = "/user/unbanUser",
}

export default function GetApiEndpoint(apiEndpoint: Api): string {
  return backEndPrefix + apiEndpoint;
}
