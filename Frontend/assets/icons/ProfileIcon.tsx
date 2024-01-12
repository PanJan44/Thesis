import Svg, { G, Path } from "react-native-svg";
import { Pressable, View } from "react-native";

export function ProfileIconFilled() {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Svg
        fill="none"
        height={38}
        viewBox="0 0 48 48"
        width={38}
      >
        <G fill="#fff">
          <Path d="M33 17c0 4.973-4.027 9-9 9s-9-4.027-9-9 4.027-9 9-9 9 4.027 9 9zM24 28c-6.008 0-18 3.035-18 8v6h36v-6c0-4.965-11.992-8-18-8z" />
        </G>
      </Svg>
    </View>
  );
}

export function ProfileIconOutline() {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Svg
        fill="none"
        height={38}
        viewBox="0 0 48 48"
        width={38}
      >
        <G clipRule="evenodd" fill="#fff" fillRule="evenodd">
          <Path
            d="M24 26c5.525 0 10-4.475 10-10S29.525 6 24 6s-10 4.475-10 10 4.475 10 10 10zm8-10c0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8 8 3.58 8 8zM6 36c0-4.965 11.992-8 18-8s18 3.035 18 8v6H6zm2 0c0-.37.22-.979 1.223-1.788.981-.791 2.443-1.545 4.215-2.197C16.98 30.712 21.247 30 24 30s7.02.712 10.562 2.015c1.772.652 3.234 1.406 4.215 2.197C39.78 35.022 40 35.629 40 36v4H8z" />
        </G>
      </Svg>
    </View>
  );
}
