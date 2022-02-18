import { h, Component } from 'preact';

export function ParagraphWithFirstLetterSpan({ children }) {
  const child = children[0] as string;
  const first = child[0];
  children[0] = child.substr(1);
  return (
    <p>
      <span className="first-letter">{first}</span>
      {children}
    </p>
  );
}
