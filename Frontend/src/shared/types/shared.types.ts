import { Location } from "../../components/meeting/types/meeting.type";

export interface User {
  id: number,
  nickname: string,
}

export enum Role {
  "User" = "User",
  "Admin" = "Admin"
}

export interface UserDetails {
  id: number;
  nickname: string;
  firstName: string | null;
  lastName: string | null;
  trainingSince: Date | null;
  achievements: string | null;
  activityStatus: number;
  isBanned: boolean | null;
}

export enum UserActivityStatus {
  Active = 1,
  Inactive,
  Injured,
}

export interface Address {
  PlaceId: string,
  Latitude: number;
  Longitude: number;
  PlaceName: string,
  City: string,
  StreetName?: string,
  StreetNumber?: string;
  PlaceUrl: string,
}

export interface UserAdditionalInfo {
  trainingSince?: Date,
  firstName?: string,
  lastName?: string,
  achievements?: string,
  activityStatus?: number
}

export interface GetMeetingsInDistance {
  lat: number,
  lon: number,
  radius?: number,
  when?: string,
  pageSize?: number,
  pageNumber?: number
}

export interface File {
  file: string,
  contentType: string
}

export interface MeetingOverview {
  id: number;
  title: string;
  start: Date;
  end: Date;
  image?: File | null;
  location: Location;
}

export interface Note {
  id: number;
  content: string;
  creationDate: Date;
}

export interface GroupedNotes {
  authorId: number,
  nickname: string,
  notes: Note[]
}
