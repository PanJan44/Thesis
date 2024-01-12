import { StyleSheet, View } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import { COLORS } from "../../styles";
import { Moment } from "moment";

type Props = {
  onDateChange: (date: Moment) => void
  restrictMonthNavigation?: boolean,
  minDate?: Date,
  maxDate?: Date,
}

const monthNamesPl = [
  "Styczeń",
  "Luty",
  "Marzec",
  "Kwiecień",
  "Maj",
  "Czerwiec",
  "Lipiec",
  "Sierpień",
  "Wrzesień",
  "Październik",
  "Listopad",
  "Grudzień"
];

const dayNamesPl = ["Pon.", "Wt.", "Śr.", "Czw.", "Pt.", "Sob.", "Niedz."];

export const MyCalendarPicker = ({ onDateChange, restrictMonthNavigation, minDate, maxDate }: Props) => {
  return (
    <View style={styles.wrapper}>
      <CalendarPicker
        height={350}
        width={350}
        selectedDayStyle={{ backgroundColor: COLORS.primary["300"] }}
        textStyle={styles.textStyle}
        startFromMonday={true}
        onDateChange={onDateChange}
        restrictMonthNavigation={restrictMonthNavigation ?? true}
        minDate={minDate}
        maxDate={maxDate}
        previousTitle={"Poprz."}
        nextTitle={"Nast."}
        months={monthNamesPl}
        weekdays={dayNamesPl}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 50
  },

  textStyle: {
    color: "white"
  }
});
