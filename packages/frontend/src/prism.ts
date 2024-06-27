import type prism from "prismjs";
import prismjs from "prismjs";
import "prismjs/components/prism-java.js";
import "prismjs/components/prism-groovy.js";

export function getGrammar(lang = "none"): {
  grammar: prism.Grammar;
  lang: string;
  className: string;
} {
  const grammar = prismjs.languages[lang];

  if (!grammar) {
    return getGrammar("plain");
  }

  return { grammar, lang, className: `language-${lang}` };
}

export function highlight(code: string, grammar: prism.Grammar, lang: string) {
  return prismjs.highlight(code, grammar, lang);
}
