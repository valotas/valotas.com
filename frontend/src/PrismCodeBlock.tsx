import type prism from "prismjs";
import { languages, highlight } from "prismjs";
import "prismjs/themes/prism-okaidia.css";
import "prismjs/components/prism-java";
import "prismjs/components/prism-groovy";
import React, { PropsWithChildren } from "react";
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
  const { grammar, lang, className } = getLanguageGrammar(language);

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

function getLanguageGrammar(lang = "none"): {
  grammar: prism.Grammar;
  lang: string;
  className: string;
} {
  const grammar = languages[lang];

  if (!grammar) {
    return getLanguageGrammar("plain");
  }

  return { grammar, lang, className: `language-${lang}` };
}
