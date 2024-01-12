import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { View } from "react-native";
//
// type Props = {
//   size: number
// }

export function HomeIconOutline() {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Svg
        fill="none"
        height={30}
        viewBox="0 0 25 25"
        width={30}
      >
        <Path
          clipRule="evenodd"
          d="M13.201 3.144a.75.75 0 00-.971 0l-7 5.95-3 2.55a.75.75 0 00.971 1.143l1.765-1.5v8.429c0 .966.783 1.75 1.75 1.75h12a1.75 1.75 0 001.75-1.75v-8.429l1.764 1.5a.75.75 0 10.971-1.143l-3-2.55zm5.765 6.868L12.716 4.7l-6.25 5.312v9.704c0 .138.112.25.25.25h12a.25.25 0 00.25-.25z"
          fill="#fff"
          fillRule="evenodd"
        />
      </Svg>
    </View>
  );
}

export function HomeIconFilled() {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Svg
        fill="none"
        height={30}
        viewBox="0 0 25 25"
        width={30}
      >
        <Path
          clipRule="evenodd"
          d="M13.201 3.144a.75.75 0 00-.971 0l-10 8.5a.75.75 0 00.971 1.143l2.515-2.137v9.066a1 1 0 001 1h12a1 1 0 001-1V10.65l2.514 2.137a.75.75 0 10.971-1.143z"
          fill="#fff"
          fillRule="evenodd"
        />
      </Svg>
    </View>
  );
}
