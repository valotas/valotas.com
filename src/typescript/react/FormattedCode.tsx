import { h } from 'preact';
import { highlight, languages } from 'prismjs';

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

  if (language === 'js') {
    language = 'javascript';
  }
  const format = languages[language];

  const html = {
    __html: format ? highlight(code, format) : code
  };
  return (
    <code className={`language-${language}`} dangerouslySetInnerHTML={html} />
  );
}
