import { SvgIcon, type SvgIconProps } from "@mui/material";
import monogramUrl from "../../../public/ATMonogram.svg";

export default function MonogramIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      viewBox="0 0 54 54"
      {...props}
      sx={{
        fill: "none",
        // The artwork is 54x54; without a matching viewBox it overflowed the
        // default 24x24 icon box and rendered as a clipped fragment.
        fontSize: { xs: 40, md: 48 },
        // The artwork's dark olive is baked into the SVG and disappears against
        // the olive pages; it's an <image>, so a filter is the only way to
        // recolour it to cream.
        filter: "brightness(0) invert(1)",
        opacity: 0.9,
        ...props.sx,
      }}
    >
      <image href={monogramUrl} width="54" height="54" />
    </SvgIcon>
  );
}
