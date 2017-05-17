import { h } from 'preact';
import { GistStore } from '../content/GistStore';
import { isPromise } from '../utils';
import { Link } from './Link';
import { Icon } from './Icon';
import { FormattedCode } from './FormattedCode';

export function Code(props) {
  const { children } = props;
  const title = children.length > 1 ? children[0] : null;
  const code = children.length > 1 ? children[1] : children;
  return (
    <div className='codeblock'>
      <Title title={title}/>
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
  return <pre {...dataProps}>{createCodeBlock(props.children)}</pre>;
}

function createCodeBlock(code) {
  if (code.length === 1 && code[0].nodeName === 'code') {
    return code;
  }
  return (<code>{code}</code>);
}
