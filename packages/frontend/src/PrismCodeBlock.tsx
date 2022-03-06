import React, { PropsWithChildren } from "react";
import { getGrammar, highlight } from "./prism";
import { tw } from "./twind";

export type PrismCodeProps = {
  language?: string;
  code?: string;
  title?: string | JSX.Element;
};

export function PrismCodeBlock({
  language,
  code,
  title,
  children,
}: PropsWithChildren<PrismCodeProps>) {
  return (
    <div className={tw`bg-gray-100 rounded`}>
      {title && <div className={tw`px-3 pt-2`}>{title}</div>}
      <PossiblyHighlightedCode language={language} code={code}>
        {children}
      </PossiblyHighlightedCode>
    </div>
  );
}

function PossiblyHighlightedCode({
  language = "none",
  code,
  children,
}: PropsWithChildren<PrismCodeProps>) {
  const { grammar, lang, className } = getGrammar(language);

  if (children) {
    return (
      <pre>
        <code className={className}>{children}</code>
      </pre>
    );
  }

  code = (code || "").trim();
  const html = {
    __html: highlight(code, grammar, lang),
  };

  return (
    <pre className={className}>
      <code className={className} dangerouslySetInnerHTML={html} />
    </pre>
  );
}
