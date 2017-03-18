import { h } from 'preact';

export function ParagraphWithFirstLetterSpan(props) {
  const childs = Array.from(props.children); // React.Children.toArray(props.children);
  const child = childs[0] as string;
  const first = child[0];
  childs[0] = child.substr(1);
  return <p><span className='first-letter'>{first}</span>{childs}</p>;
}
