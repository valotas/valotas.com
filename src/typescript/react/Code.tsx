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
      {createTitleBlock(title)}
      {createPreBlock(props, code)}
    </div>
  );
}

function createTitleBlock(title) {
  if (!title) {
    return null;
  }
  return (<div className='title'>{title}</div>);
}

function createPreBlock(props, code) {
  const dataProps = {};
  Object.keys(props).forEach((key) => {
    if (key.indexOf('data-') === 0) {
      dataProps[key] = props[key];
    }
  });
  return <pre {...dataProps}>{createCodeBlock(code)}</pre>;
}

function createCodeBlock(code) {
  if (code.length === 1 && code[0].nodeName === 'code') {
    return code;
  }
  return (<code>{code}</code>);
}
