import { BROWSER } from "./Browser";

export function loadWebFonts(
  families: string[] = ["Gloria+Hallelujah::latin", "Open+Sans::latin,greek"],
  win = BROWSER
) {
  win.prop("WebFontConfig", {
    google: { families: families },
  });
  win.addScript("//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js");
}
