import { NavigatorScreenParams } from "@react-navigation/native";
import { GetMeetingsInDistance, UserAdditionalInfo } from "../../../shared/types/shared.types";

export type RootStackParams = {
  HomeStack: NavigatorScreenParams<HomeStackParams>;
  AddMeeting: undefined;
  LoginStack: NavigatorScreenParams<LoginStackParams>;
  MyProfile: {
    id?: number
  };
  SignUp: undefined;
};

export type LoginStackParams = {
  Login: undefined;
  SignUp: undefined;
  Home: undefined;
}

export type ProfileStackParams = {
  Profile: {
    id?: number,
  },
  Notes: {
    meetingId: number
  },
  Meeting: {
    id: number
  }
  EditUserInformation: {
    additionalInfo: UserAdditionalInfo
  }
}

export type HomeStackParams = {
  Home: {
    searchMeetingsParams?: GetMeetingsInDistance | null
  };
  SearchMeeting: undefined;
  ProfileStack: NavigatorScreenParams<ProfileStackParams>
}

