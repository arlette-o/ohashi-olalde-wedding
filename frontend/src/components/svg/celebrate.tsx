import { SvgIcon, type SvgIconProps } from "@mui/material";
import celebrateUrl from "../../../public/Celebrate.svg";

export default function CelebrateIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      viewBox="0 0 54 54"
      {...props}
      sx={{
        fill: "none",
        ...props.sx,
      }}
    >
      <image href={celebrateUrl} width="54" height="54" />
    </SvgIcon>
  );
}
