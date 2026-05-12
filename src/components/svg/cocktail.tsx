import { SvgIcon, type SvgIconProps } from "@mui/material";
import cocktailUrl from "../../../public/Cocktail.svg";

export default function CocktailIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...props}
      sx={{
        overflow: "visible",
        fill: "none",
        ...props.sx,
      }}
    >
      <image href={cocktailUrl} width="54" height="54" />
    </SvgIcon>
  );
}
