import Svg, { Circle, Path } from "react-native-svg";
import { View } from "react-native";

export function AddIconOutline() {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Svg
        width={32}
        height={32}
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Circle cx={12} cy={12} r={10} />
        <Path d="M12 8L12 16" />
        <Path d="M8 12L16 12" />
      </Svg>
    </View>
  );
}

export function AddIconFilled() {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Svg
        fill="none"
        height={34}
        viewBox="0 0 24 24"
        width={34}
      >
        <Path
          d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2zm4 10.75h-3.25V16c0 .41-.34.75-.75.75s-.75-.34-.75-.75v-3.25H8c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h3.25V8c0-.41.34-.75.75-.75s.75.34.75.75v3.25H16c.41 0 .75.34.75.75s-.34.75-.75.75z"
          fill="#fff"
        />
      </Svg>
    </View>
  );
}

