import { SvgIcon, type SvgIconProps } from "@mui/material";
import dinnerPlateUrl from "../../../public/dinnerPlate.svg";

export default function DinnerPlateIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...props}
      sx={{
        overflow: "visible",
        fill: "none",
        ...props.sx,
      }}
    >
      <image href={dinnerPlateUrl} width="54" height="54" />
    </SvgIcon>
  );
}
