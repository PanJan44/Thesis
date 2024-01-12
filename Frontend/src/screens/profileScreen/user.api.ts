import axios, { AxiosError } from "axios";
import GetApiEndpoint, { Api } from "../../core/api.enum";
import { MeetingOverview, UserDetails } from "../../shared/types/shared.types";
import { EnumMapper } from "../../core/enumMapper";
import { Role } from "react-native";

export const UserApi = {
  async getCurrenUserId(): Promise<number | null> {
    try {
      return (await axios.get(GetApiEndpoint(Api.USER_ID))).data;
    } catch (error: any | AxiosError) {
      console.log(error.message);
      return null;
    }
  },

  async getCurrenUserRole(): Promise<Role | null> {
    try {
      return (await axios.get(GetApiEndpoint(Api.USER_ROLE))).data;
    } catch (error: any | AxiosError) {
      console.log(error.message);
      return null;
    }
  },

  async getCurrenUserBanStatus(): Promise<boolean | null> {
    try {
      return (await axios.get(GetApiEndpoint(Api.USER_BAN_STATUS))).data;
    } catch (error: any | AxiosError) {
      console.log(error.message);
      return null;
    }
  },

  async getUserWithHisMeetings(id?: number | null): Promise<[MeetingOverview[], UserDetails?]> {
    try {
      const response = await axios.get(GetApiEndpoint(Api.GET_USER_WITH_ORGANIZED_MEETINGS), {
        params: { id: id ?? "" }
      });
      const user = response.data.user as UserDetails;
      const meetings = response.data.organizedMeetings as MeetingOverview[];
      return [meetings, user];
    } catch (error: any | AxiosError) {
      console.log(error.message);
      return [[], undefined];
    }
  },

  async getUserMeetings(index: number, id: number | undefined | null): Promise<MeetingOverview[]> {
    const whichMeetings = EnumMapper.MapUserMeetings(index);
    try {
      const response = await axios.get(GetApiEndpoint(whichMeetings), {
        params: { id: id ?? "" }
      });
      return response.data;
    } catch (error: any | AxiosError) {
      console.log(error.message);
      return [];
    }
  },

  async editUserInformation(trainingSince?: Date, achievements?: string, firstName?: string, lastName?: string, activityStatus?: string): Promise<void> {
    const status = EnumMapper.MapStatusString(activityStatus);
    try {
      const response = await axios.put(GetApiEndpoint(Api.ADDITIONAL_INFORMATION), {
        trainingSince,
        achievements,
        firstName,
        lastName,
        activityStatus: status
      });
      return response.data;
    } catch (error: any | AxiosError) {
      console.log(error.message);
    }
  },

  async removeUserComment(commentId: number): Promise<void> {
    try {
      const response = await axios.delete(GetApiEndpoint(Api.REMOVE_COMMENT),
        { params: { commentId } });
      console.log(response.data);
    } catch (error: any | AxiosError) {
      console.log(error.message);
    }
  },


  async banUser(userId: number): Promise<void> {
    try {
      await axios.get(GetApiEndpoint(Api.BAN_USER),
        { params: { userId } });
    } catch (error: any | AxiosError) {
      console.log(error.message);
    }
  },

  async unbanUser(userId: number): Promise<void> {
    try {
      await axios.get(GetApiEndpoint(Api.UNBAN_USER),
        { params: { userId } });
    } catch (error: any | AxiosError) {
      console.log(error.message);
    }
  }

};
