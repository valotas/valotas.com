import React from "react";
import { HtmlRendererProps } from "react-marked-renderer";
import { Gist, parseGist } from "./Gist.js";

export function Html({ raw }: HtmlRendererProps) {
  const gist = parseGist(raw);
  if (gist) {
    return <Gist {...gist} />;
  }
  return null;
}
