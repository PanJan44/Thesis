import { GooglePlaceData, GooglePlaceDetail, GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Constants } from "../../shared/constants/consts.enum";
import { COLORS } from "../../styles";
import { StyleSheet } from "react-native";

type Props = {
  onSearch: (place: GooglePlaceData, details: GooglePlaceDetail | null) => void;
  autoFocus?: boolean;
}

export const PlaceSearchingInput = ({ onSearch, autoFocus }: Props) => {
  return (
    <GooglePlacesAutocomplete
      placeholder={"Gdzie chcesz trenować?"}
      query={{
        key: Constants.PLACES_API_KEY,
        language: "pl",
        components: "country:pl"
      }}
      fetchDetails={true}
      onPress={onSearch}
      enablePoweredByContainer={false}
      styles={styles}
      textInputProps={{
        autoFocus: autoFocus
      }}
      currentLocation={true}
      currentLocationLabel={"Moja lokalizacja"}
      enableHighAccuracyLocation={true}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    zIndex: 1,
    position: "absolute",
    width: "100%"
  },
  textInput: {
    backgroundColor: COLORS.secondary["500"],
    color: "white",
    borderRadius: 16,
    padding: 16
  },
  listView: {
    color: "black",
    zIndex: 1
    // marginTop: 20,
  },
  row: {
    backgroundColor: COLORS.secondary["500"]
  },
  separator: {
    // height: 1,
    backgroundColor: COLORS.secondary["500"]
  },
  description: {
    color: "white"
  }
});
