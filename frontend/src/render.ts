import { renderToString } from "preact-render-to-string";
import { h } from "preact";
import { Page } from "./Page.js";

export function render(_raw: string) {
  return renderToString(h(Page, null));
}
