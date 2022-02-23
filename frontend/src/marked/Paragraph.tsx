import React from "react";
import type { ParagraphRendererProps } from "react-marked-renderer";
import { tw } from "../twind";

export function Paragraph({ children }: ParagraphRendererProps) {
  return <p className={tw`pb-1 pt-1`}>{children}</p>;
}
