import * as twind from "twind";
import { css } from "twind/css";
import * as colors from "twind/colors";

type Colors = typeof colors;
type Color = keyof Colors;

function isColor(c?: string): c is Color {
  return (c && c in colors) || false;
}

const fill: twind.Plugin = (parts) => {
  const color: Color = isColor(parts[0]) ? parts[0] : "black";
  const selectedColor: any = colors[color];
  const weight = parseInt(parts[1], 10) || 500;
  const colorWithWeight = selectedColor[weight];

  return css`
    fill: ${colorWithWeight};
  `;
};

let twInstance = twind.create({
  plugins: { fill },
});

twind.warn

export function setup(conf: Pick<twind.Configuration, "sheet"> = {}) {
  twInstance = twind.create({
    plugins: { fill },
    sheet: conf.sheet,
  });
}

export const tw = Object.defineProperties(
  (templateOrToken: string | twind.Token, ...tokens: twind.Token[]) =>
    twInstance.tw(templateOrToken, ...tokens),
  {
    theme: {
      get: () => twInstance.tw.theme,
    },
  }
) as twind.TW;
