import { tw, setup } from "twind";
import { css } from "twind/css";
import * as colors from "twind/colors";

type Colors = typeof colors;
type Color = keyof Colors;

function isColor(c?: string): c is Color {
  return (c && c in colors) || false;
}

setup({
  plugins: {
    fill: (parts) => {
      const color: Color = isColor(parts[0]) ? parts[0] : "black";
      const selectedColor: any = colors[color];
      const weight = parseInt(parts[1], 10) || 500;
      const colorWithWeight = selectedColor[weight];

      return css`
        fill: ${colorWithWeight};
      `;
    },
  },
});

export { tw, setup };
