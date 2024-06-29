// @ts-expect-error TS2305
import { CodeBlockRendererProps } from "react-marked-renderer";
import { PrismCodeBlock } from "../PrismCodeBlock.js";

export function CodeBlock({ lang, children }: CodeBlockRendererProps) {
  const code = typeof children === "string" ? children : undefined;
  return (
    <PrismCodeBlock language={lang} code={code}>
      {code ? undefined : children}
    </PrismCodeBlock>
  );
}
