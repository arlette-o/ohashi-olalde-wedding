import { SvgIcon, type SvgIconProps } from "@mui/material";
import cocktailUrl from "../../../public/Cocktail.svg";

export default function CocktailIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      viewBox="0 0 54 54"
      {...props}
      sx={{
        fill: "none",
        ...props.sx,
      }}
    >
      <image href={cocktailUrl} width="54" height="54" />
    </SvgIcon>
  );
}
