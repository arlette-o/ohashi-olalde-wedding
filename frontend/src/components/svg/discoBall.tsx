import { SvgIcon, type SvgIconProps } from "@mui/material";
import discoballUrl from "../../../public/DiscoBall.svg";

export default function DiscoballIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      viewBox="0 0 54 54"
      {...props}
      sx={{
        fill: "none",
        ...props.sx,
      }}
    >
      <image href={discoballUrl} width="54" height="54" />
    </SvgIcon>
  );
}
