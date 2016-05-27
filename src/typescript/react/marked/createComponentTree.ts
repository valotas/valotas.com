import * as React from 'react';
import {Gist as GistComponent} from '../Gist';
import {Link as LinkComponent} from '../Link';
import {MarkedReactRenderer} from './MarkedRenderer';

export function createComponentTree(html: string, options = {firstLetterSpan: false}): React.ReactElement<any> {
    const renderer = new MarkedReactRenderer({
        firstLetterSpan: options.firstLetterSpan,
        html: [htmlToGistTransformer],
        pre: React.DOM.pre, 
        link: Link
    });
	return renderer.createComponentTree(html);
}

const Link = React.createFactory(LinkComponent);

const GIST_SCRIPT = /script.*src=.*gist.github.com\/(([^\/]*)\/)?(([^\?]*)\.js(on)?)(\?(file=([^"]*)))?/;
const Gist = React.createFactory(GistComponent);


function htmlToGistTransformer(html: string) {
	const matches = GIST_SCRIPT.exec(html);
	if (!matches) {
		return null;
	}
	return {
		factory: Gist as React.DOMFactory<any, any>,
		props: {
			user: matches[2],
			gistId: matches[4],
			file: matches[8]
		}
	};
}
