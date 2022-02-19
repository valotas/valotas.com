import { h } from "preact";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-java";
import "prismjs/components/prism-groovy";

type FormattedCodeProps = { language?; code?; children? };

export function FormattedCode({
  language,
  code,
  children,
}: FormattedCodeProps) {
  code = code || children[0];
  if (!language) {
    return <code>{code}</code>;
  }

  const html = {
    __html: highlightCode(code, language),
  };
  return (
    <code className={`language-${language}`} dangerouslySetInnerHTML={html} />
  );
}

function highlightCode(code, lang = "none") {
  const highlightLang = languages[lang];
  if (!highlightLang) {
    return code;
  }
  return highlight(code, highlightLang);
}
