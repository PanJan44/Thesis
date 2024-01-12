import { Address, File, User } from "../../../shared/types/shared.types";

export interface Location {
  placeName: string,
  city: string,
  streetName?: string,
  streetNumber?: number,
  placeUrl: string,
}

export interface Meeting {
  id: number,
  title: string,
  description: string | null,
  start: Date,
  end: Date,
  participantsCount: number
  commentsCount: number,
  organizer: User,
  image: File | null,
  location: Location,
  isCurrentUserParticipating: boolean,
}

export interface Participation {
  isCurrentUserParticipating: boolean,
  participantsCount: number
}

export interface Comment {
  id: number,
  content: string,
  author: User,
  creationTime: Date
}

export interface AddMeeting {
  address: Address,
  title: string,
  description?: string | null,
  start: Date,
  end: Date,
  pictureBase64?: string | null
}
