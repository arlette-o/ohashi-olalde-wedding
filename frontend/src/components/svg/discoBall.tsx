import { SvgIcon, type SvgIconProps } from "@mui/material";
import discoballUrl from "../../../public/discoball.svg";

export default function DiscoballIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...props}
      sx={{
        overflow: "visible",
        fill: "none",
        ...props.sx,
      }}
    >
      <image href={discoballUrl} width="54" height="54" />
    </SvgIcon>
  );
}
