import Svg, { Path } from "react-native-svg";
import { COLORS } from "../../src/styles";

export const MinusIcon = () => {
  return (
    <Svg
      fill="red"
      width={16}
      height={16}
      viewBox="0 0 485.064 485.064"
    >
      <Path
        d="M458.736 181.097H26.334C11.793 181.097 0 192.884 0 207.425v70.215c0 14.541 11.787 26.328 26.334 26.328h432.402c14.541 0 26.328-11.787 26.328-26.328v-70.215c.006-14.541-11.781-26.328-26.328-26.328z" />
    </Svg>
  );
};
