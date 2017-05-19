import { h } from 'preact';
import { GistStore } from '../content/GistStore';
import { isPromise } from '../utils';
import { Link } from './Link';
import { Icon } from './Icon';

export function Code(props) {
  const { children } = props;
  const title = children.length > 1 ? children[0] : null;
  const code = children.length > 1 ? children[1] : children;
  return (
    <div className='codeblock'>
      <Title title={title} />
      <PreCode {...props}>{code}</PreCode>
    </div>
  );
}

function Title({ title }) {
  if (!title) {
    return null;
  }
  return (<div className='title'>{title}</div>);
}

function PreCode(props) {
  const dataProps = {};
  Object.keys(props).forEach((key) => {
    if (key.indexOf('data-') === 0) {
      dataProps[key] = props[key];
    }
  });
  return (
    <pre {...dataProps}>
      <OneCodeBlock>
        {props.children}
      </OneCodeBlock>
    </pre>
  );
}

function OneCodeBlock({ children }) {
  const code = children[0];
  if (!code.nodeName) {
    return <code>{code}</code>;
  }
  return code;
}
