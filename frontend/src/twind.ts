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

let configurationToLoad: twind.Configuration | null = {
  plugins: {
    fill,
  },
};

export function setup(conf: twind.Configuration) {
  if (!configurationToLoad) {
    throw new Error(`Late setup call. twind has already been configured`);
  }
  configurationToLoad = {
    ...configurationToLoad,
    ...conf,
    plugins: { ...(conf.plugins || {}), fill },
  };
}

function ensureSetup() {
  if (!configurationToLoad) {
    return;
  }

  twind.setup(configurationToLoad);

  configurationToLoad = null;
}

export const tw: twind.TW = Object.defineProperties(
  ((templateOrToken: string | twind.Token, ...tokens: twind.Token[]) => {
    ensureSetup();
    return twind.tw(templateOrToken, ...tokens);
  }) as twind.TW,
  {
    theme: {
      get: () => twind.tw.theme,
    },
  }
);
