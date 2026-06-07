import { SvgIcon, type SvgIconProps } from "@mui/material";
import celebrateUrl from "../../../public/Celebrate.svg";

export default function CelebrateIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...props}
      sx={{
        overflow: "visible",
        fill: "none",
        ...props.sx,
      }}
    >
      <image href={celebrateUrl} width="54" height="54" />
    </SvgIcon>
  );
}
