import { SvgIcon, type SvgIconProps } from "@mui/material";
import ringsUrl from "../../../public/Rings.svg";

export default function RingsIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...props}
      sx={{
        overflow: "visible",
        fill: "none",
        ...props.sx,
      }}
    >
      <image href={ringsUrl} width="54" height="54" />
    </SvgIcon>
  );
}
