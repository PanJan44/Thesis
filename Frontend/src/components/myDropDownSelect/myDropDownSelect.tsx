import SelectDropdown from "react-native-select-dropdown";
import { StyleSheet, View } from "react-native";
import { COLORS, FONTS } from "../../styles";

type Props = {
  data: string[],
  onSelect: (value: string) => void,
  title: string
}
export const MyDropDownSelect = ({ data, onSelect, title }: Props) => {
  return (
    <View>
      <SelectDropdown
        defaultButtonText={title}
        data={data}
        onSelect={onSelect}
        dropdownStyle={styles.dropdown}
        buttonStyle={styles.button}
        buttonTextStyle={styles.buttonText}
        rowStyle={styles.row}
        rowTextStyle={styles.rowText}

      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: COLORS.background["300"]
  },
  button: {
    backgroundColor: COLORS.background["300"],
    width: 140,
    height: 40,
    borderRadius: 10
  },
  buttonText: {
    fontSize: 16,
    fontFamily: FONTS.secondary.medium,
    color: "white",
    backgroundColor: COLORS.background["300"]
  },
  row: {
    padding: 4
  },
  rowText: {
    fontSize: 12,
    color: COLORS.lightFont,
    fontFamily: FONTS.secondary.medium
  }
});
