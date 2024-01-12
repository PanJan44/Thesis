import Svg, { G, Path } from "react-native-svg";

export const ExitIcon = () =>
{
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 256 256"
    >
      <G
        stroke="none"
        strokeWidth={0}
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeMiterlimit={10}
        fill="none"
        fillRule="nonzero"
        opacity={1}
      >
        <Path
          d="M3 90a2.998 2.998 0 01-2.121-5.121l84-84a2.998 2.998 0 014.242 0 2.998 2.998 0 010 4.242l-84 84A2.988 2.988 0 013 90z"
          transform="matrix(2.81 0 0 2.81 1.407 1.407)"
          stroke="none"
          strokeWidth={1}
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit={10}
          fill="#fff"
          fillRule="nonzero"
          opacity={1}
        />
        <Path
          d="M87 90a2.99 2.99 0 01-2.121-.879l-84-84a2.998 2.998 0 010-4.242 2.998 2.998 0 014.242 0l84 84A2.998 2.998 0 0187 90z"
          transform="matrix(2.81 0 0 2.81 1.407 1.407)"
          stroke="none"
          strokeWidth={1}
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit={10}
          fill="#fff"
          fillRule="nonzero"
          opacity={1}
        />
      </G>
    </Svg>
  )
}
