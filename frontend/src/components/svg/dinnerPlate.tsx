import { SvgIcon, type SvgIconProps } from "@mui/material";
import dinnerPlateUrl from "../../../public/DinnerPlate.svg";

export default function DinnerPlateIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      viewBox="0 0 54 54"
      {...props}
      sx={{
        fill: "none",
        ...props.sx,
      }}
    >
      <image href={dinnerPlateUrl} width="54" height="54" />
    </SvgIcon>
  );
}
