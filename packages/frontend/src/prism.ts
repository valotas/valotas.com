import type prism from "prismjs";
import { languages, highlight as pHighlight } from "prismjs";
import "prismjs/components/prism-java";
import "prismjs/components/prism-groovy";

export function getGrammar(lang = "none"): {
  grammar: prism.Grammar;
  lang: string;
  className: string;
} {
  const grammar = languages[lang];

  if (!grammar) {
    return getGrammar("plain");
  }

  return { grammar, lang, className: `language-${lang}` };
}

export function highlight(code: string, grammar: prism.Grammar, lang: string) {
  if (typeof window !== "undefined") {
    require("prismjs/themes/prism-okaidia.css");
  }
  return pHighlight(code, grammar, lang);
}
