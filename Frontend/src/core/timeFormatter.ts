export const TimeFormatter = {
  formatToDayAndTime(date: Date): string {
    const dateString = this.formatToDayOnly(date);

    let localeDateString = date.toTimeString();
    let timeParts = localeDateString.split(":");
    localeDateString = timeParts.slice(0, 2).join(":");

    return dateString + " " + localeDateString;
  },

  formatToDayOnly(date: Date): string {
    let dateString = date.toLocaleDateString("pl-PL",
      {
        timeStyle: "short",
        dateStyle: "short",
        month: "short",
        day: "numeric"
      });
    let dateParts = dateString.split(" ");
    dateString = dateParts.reverse().slice(0).join("/");

    return dateString;
  },

  formatToMonthDayAndYear(date: Date | undefined | null): string | null {
    if (!date)
      return null;

    date = new Date(date);

    let dateString = date.toDateString();
    let formattedDateString = this.formatToDayOnly(date);

    return formattedDateString + " " + dateString.split(" ")[3];
  },

  formatFromPartsToFullDate(date1: Date, date2: Date): Date {
    let dateString1 = date1.toISOString();
    let dateString2 = date2.toISOString();
    let date1Parts = dateString1.split("T");
    let date2Parts = dateString2.split("T");

    return new Date(date1Parts[0] + "T" + date2Parts[1]);
  }
};
