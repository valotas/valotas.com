import { renderToString } from "preact-render-to-string";
import { h } from "preact";
import type { PageProps } from "./Page";
import { Page } from "./Page.js";

export function render(props: PageProps) {
  return renderToString(h(Page, props));
}
