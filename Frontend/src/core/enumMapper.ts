import { Api } from "./api.enum";
import { UserActivityStatus } from "../shared/types/shared.types";

export const EnumMapper = {
  MapStatus(status?: number): string {
    switch (status) {
      case 1:
        return "Aktywny";
      case 2:
        return "Nieaktywny";
      case 3:
        return "Kontuzjowany";
      default:
        return "Aktywny";
    }
  },

  MapStatusString(status?: string) {
    switch (status) {
      case "Aktywny":
        return UserActivityStatus.Active.toString();
      case "Nieaktywny":
        return UserActivityStatus.Inactive.toString();
      case "Kontuzjowany":
        return UserActivityStatus.Injured.toString();
      default:
        return UserActivityStatus.Active.toString();
    }
  },

  MapUserMeetings(index: number): Api {
    switch (index) {
      case 0:
        return Api.GET_USER_ORGANIZED_MEETINGS;
      case 1:
        return Api.GET_USER_TAKING_PART_IN_MEETINGS;
      case 2:
        return Api.GET_USER_TAKEN_PART_IN_MEETINGS;
      default:
        return Api.GET_USER_ORGANIZED_MEETINGS;
    }
  },
};
