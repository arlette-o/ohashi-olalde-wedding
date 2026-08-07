import { SvgIcon, type SvgIconProps } from "@mui/material";
import clockUrl from "../../../public/Clock.svg";

export default function ClockIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      viewBox="0 0 54 54"
      {...props}
      sx={{
        fill: "none",
        ...props.sx,
      }}
    >
      <image href={clockUrl} width="54" height="54" />
    </SvgIcon>
  );
}
