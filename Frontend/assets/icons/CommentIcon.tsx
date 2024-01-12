import Svg, { Path } from "react-native-svg";

type Props = {
  color: string;
}
export const CommentIcon = ({ color }: Props) => {
  return (
    <Svg
      viewBox="0 0 30 30"
      width={26}
      height={26}
      fill={"none"}
      stroke={color}
      strokeWidth={2}
    >
      <Path
        d="M15 3C7.82 3 2 7.925 2 14c0 3.368 1.793 6.378 4.611 8.396.072 1.536-.166 3.657-2.285 4.635a.5.5 0 00-.004.002A.5.5 0 004 27.5a.5.5 0 00.5.5l.035-.002a.5.5 0 00.008 0c2.434-.016 4.5-1.331 5.926-2.72.452-.442 1.082-.659 1.703-.542.91.173 1.856.264 2.828.264 7.18 0 13-4.925 13-11S22.18 3 15 3z" />
    </Svg>
  );
};
