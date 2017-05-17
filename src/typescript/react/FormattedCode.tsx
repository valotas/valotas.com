import { h } from 'preact';
import { highlight, languages } from 'prismjs';

export function FormattedCode({ language, code }: { language?, code }) {
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
