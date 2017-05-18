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
  const html = {
    __html: highlight(code, languages[language])
  };
  return (
    <code className={`language-${language}`} dangerouslySetInnerHTML={html} />
  );
}
