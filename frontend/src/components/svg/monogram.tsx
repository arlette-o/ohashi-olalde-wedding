import { SvgIcon, type SvgIconProps } from "@mui/material";
import monogramUrl from "../../../public/ATMonogram.svg";

export default function MonogramIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...props}
      sx={{
        overflow: "visible",
        fill: "none",
        ...props.sx,
      }}
    >
      <image href={monogramUrl} width="54" height="54" />
    </SvgIcon>
  );
}
