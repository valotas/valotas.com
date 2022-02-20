import React from "react";
import { renderToString } from "react-dom/server.js";
import type { PageProps } from "./Page";
import { Page } from "./Page.js";

export function render(props: PageProps) {
  return renderToString(<Page {...props} />);
}
