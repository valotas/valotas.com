import React from "react";
import { CodeBlockRendererProps } from "react-marked-renderer";
import { PrismCodeBlock } from "../PrismCodeBlock";

export function CodeBlock({ lang, children }: CodeBlockRendererProps) {
  return <PrismCodeBlock language={lang}>{children}</PrismCodeBlock>;
}
