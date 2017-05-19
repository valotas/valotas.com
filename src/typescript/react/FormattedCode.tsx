import { h } from 'preact';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-java';

type FormattedCodeProps = { language?, code?, children?};

export function FormattedCode({
  language,
  code,
  children
}: FormattedCodeProps) {

  code = code || children[0];
  if (!language) {
    return <code>{code}</code>;
  }

  const html = {
    __html: highlightCode(code, language)
  };
  console.log(language, html);
  return (
    <code className={`language-${language}`} dangerouslySetInnerHTML={html} />
  );
}

function highlightCode(code, lang) {
  const highlightLang = languages[lang === 'js' ? 'javascript' : lang];
  if (!highlightLang) {
    return code;
  }
  return highlight(code, highlightLang);
}
