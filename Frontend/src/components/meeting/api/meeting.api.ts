import { AddMeeting, Comment, Meeting, Participation } from "../types/meeting.type";
import axios, { AxiosError, AxiosResponse } from "axios";
import GetApiEndpoint, { Api } from "../../../core/api.enum";
import { GetMeetingsInDistance, GroupedNotes, User } from "../../../shared/types/shared.types";

export const MeetingApi = {
  async getMeetingsInDistance({ lat, lon, radius, when, pageSize, pageNumber }: GetMeetingsInDistance): Promise<Meeting[]> {
    try {
      const response = await axios.get(GetApiEndpoint(Api.MEETINGS_IN_DISTANCE), {
        params: { lat, lon, radius, when, pageSize, pageNumber }
      });
      return response.data;
    } catch (error: any | AxiosError) {
      console.log(error.message);
      return [];
    }
  },

  async markParticipation(id: number): Promise<Participation | null> {
    try {
      const response = await axios.post(GetApiEndpoint(Api.PARTICIPATE), null, {
        params: { id }
      });
      return response.data;
    } catch (error: any | AxiosError) {
      console.log(error.respone);
      return null;
    }
  },

  async getMeetingComments(id: number): Promise<Comment[]> {
    try {
      const response = await axios.get(GetApiEndpoint(Api.GET_MEETING_COMMENTS),
        {
          params: { meetingId: id }
        });
      return response.data;
    } catch (error: any | AxiosError) {
      console.log(error.respone);
      return [];
    }
  },

  async addComment(meetingId: number, content: string): Promise<Comment | null> {
    try {
      const response = await axios.post(GetApiEndpoint(Api.ADD_COMMENT), { meetingId, content });
      return response.data;
    } catch (error: any | AxiosError) {
      console.log(error.response);
      return null;
    }
  },

  async getParticipants(id: number): Promise<User[] | null> {
    try {
      const response = await axios.get(GetApiEndpoint(Api.GET_PARTICIPANTS), { params: { meetingId: id } });
      return response.data;
    } catch (error: any | AxiosError) {
      console.log(error.response);
      return null;
    }
  },

  async createMeeting(meeting: AddMeeting): Promise<number | null> {
    try {
      const response = await axios.post(GetApiEndpoint(Api.ADD_MEETING), meeting);
      return response.data;
    } catch (error: any | AxiosError) {
      console.log(error.message);
      console.log(error.response.data);
      return null;
    }
  },

  async getNotes(meetingId: number): Promise<GroupedNotes[] | null> {
    try {
      const response = await axios.get(GetApiEndpoint(Api.GET_NOTES),
        { params: { meetingId } });

      return response.data as GroupedNotes[];
    } catch (error: any | AxiosError) {
      console.log(error.message);
      console.log(error.response);
      return null;
    }
  },

  async addNote(meetingId: number, content: string): Promise<AxiosResponse | null> {
    try {
      return await axios.post(GetApiEndpoint(Api.ADD_NOTE),
        { meetingId: meetingId, content: content });
    } catch (error: any | AxiosError) {
      console.log(error.message);
      console.log(error.response);
      return null;
    }
  },


  async cancelMeeting(meetingId: number): Promise<void> {
    try {
      await axios.get(GetApiEndpoint(Api.CANCEL),
        { params: { meetingId: meetingId } });
    } catch (error: any | AxiosError) {
      console.log(error.message);
      console.log(error.response);
    }
  },

  async getMeetingById(id: number): Promise<Meeting | undefined> {
    try {
      return await axios.get(GetApiEndpoint(Api.CANCEL),
        { params: { id } });
    } catch (error: any | AxiosError) {
      console.log(error.message);
      console.log(error.response);
      return undefined;
    }
  }

};

export default MeetingApi;
