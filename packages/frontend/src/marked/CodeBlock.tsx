import React from "react";
import { CodeBlockRendererProps } from "react-marked-renderer";
import { PrismCodeBlock } from "../PrismCodeBlock";

export function CodeBlock({ lang, children }: CodeBlockRendererProps) {
  const code = typeof children === "string" ? children : undefined;
  return (
    <PrismCodeBlock language={lang} code={code}>
      {code ? undefined : children}
    </PrismCodeBlock>
  );
}
