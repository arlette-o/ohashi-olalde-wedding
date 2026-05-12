import { SvgIcon, type SvgIconProps } from "@mui/material";
import clockUrl from "../../../public/clock.svg";

export default function ClockIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...props}
      sx={{
        overflow: "visible",
        fill: "none",
        ...props.sx,
      }}
    >
      <image href={clockUrl} width="54" height="54" />
    </SvgIcon>
  );
}
