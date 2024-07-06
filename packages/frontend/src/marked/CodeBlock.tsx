import type { PropsWithChildren } from "../jsx.js";
import { PrismCodeBlock } from "../PrismCodeBlock.js";

export type CodeBlockProps = {
  lang?: string;
  code?: string;
};

const langMap = new Map<string, string>([["js", "javascript"]]);

export function CodeBlock({
  lang,
  children,
  code,
}: PropsWithChildren<CodeBlockProps>) {
  lang = lang ? langMap.get(lang) || lang : undefined;
  code = code || (typeof children === "string" ? children : undefined);
  return <PrismCodeBlock language={lang} code={code} />;
}
