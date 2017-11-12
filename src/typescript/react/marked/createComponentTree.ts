import { h, ComponentConstructor, Component } from 'preact';
import { Gist } from '../Gist';
import { Link } from '../Link';
import { Code } from '../Code';
import { FormattedCode } from '../FormattedCode';
import { MarkedReactRenderer } from './MarkedRenderer';

export function createComponentTree(html: string, options = { firstLetterSpan: false }) {
  const renderer = new MarkedReactRenderer({
    firstLetterSpan: options.firstLetterSpan,
    html: [htmlToGistTransformer],
    pre: Code,
    code: FormattedCode,
    link: Link
  });
  return renderer.createComponentTree(html);
}

const GIST_SCRIPT = /script.*src=.*gist.github.com\/(([^/]*)\/)?(([^?]*)\.js(on)?)(\?(file=([^"]*)))?/;

function htmlToGistTransformer(html: string) {
  const matches = GIST_SCRIPT.exec(html);
  if (!matches) {
    return null;
  }
  return {
    type: Gist,
    props: {
      user: matches[2],
      gistId: matches[4],
      file: matches[8]
    }
  };
}
