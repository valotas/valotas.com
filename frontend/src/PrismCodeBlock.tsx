import prism from "prismjs";
import "prismjs/components/prism-java";
import "prismjs/components/prism-groovy";
import React, { PropsWithChildren } from "react";

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
    <div className="codeblock">
      {title && <div className="title">{title}</div>}
      <PossiblyHighlightedCode language={language} code={code}>
        {children}
      </PossiblyHighlightedCode>
    </div>
  );
}

function PossiblyHighlightedCode({
  language,
  code,
  children,
}: PropsWithChildren<PrismCodeProps>) {
  const className = language ? `language-${language}` : undefined;

  if (children) {
    return (
      <pre>
        <code className={className}>{children}</code>
      </pre>
    );
  }

  const html = {
    __html: code ? highlightCode(code, language) : "",
  };

  return (
    <pre>
      <code className={className} dangerouslySetInnerHTML={html} />
    </pre>
  );
}

function highlightCode(code: string, lang = "none") {
  const { languages, highlight } = prism;
  const grammar = languages[lang];
  if (!grammar) {
    return code;
  }
  return highlight(code, grammar, lang);
}
