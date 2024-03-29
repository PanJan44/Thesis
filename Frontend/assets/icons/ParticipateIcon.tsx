import Svg, { Path } from "react-native-svg";
import { COLORS } from "../../src/styles";

// export const ParticipateIconOutline = () => {
//   return (
//     <Svg
//       width={24}
//       height={24}
//       fill="green"
//     >
//       <Path
//         fill="#767676"
//         d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2zm-3.566 15.604a26.953 26.953 0 002.42-1.701C18.335 14.533 20 11.943 20 9c0-2.36-1.537-4-3.5-4-1.076 0-2.24.57-3.086 1.414L12 7.828l-1.414-1.414C9.74 5.57 8.576 5 7.5 5 5.56 5 4 6.656 4 9c0 2.944 1.666 5.533 4.645 7.903.745.592 1.54 1.145 2.421 1.7.299.189.595.37.934.572.339-.202.635-.383.934-.571z"
//       />
//     </Svg>
//   );
//
//
// };

type Props = {
  color: string;
}
export const ParticipateIcon = ({ color }: Props) => {
  return (
    <Svg
      width={26}
      height={26}
      viewBox="0 0 24 24"
      fill={color === COLORS.primary["300"] ? color : "none"}
      stroke={color}
      strokeWidth={2}
    >
      <Path
        d="M16.44 3.102c-1.81 0-3.43.88-4.44 2.23a5.549 5.549 0 00-4.44-2.23c-3.07 0-5.56 2.5-5.56 5.59 0 1.19.19 2.29.52 3.31 1.58 5 6.45 7.99 8.86 8.81.34.12.9.12 1.24 0 2.41-.82 7.28-3.81 8.86-8.81.33-1.02.52-2.12.52-3.31 0-3.09-2.49-5.59-5.56-5.59z"
        // fill="red"
      />
    </Svg>
  );
};
