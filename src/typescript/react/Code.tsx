import * as React from 'react';
import {GistStore} from '../content/GistStore';
import {isPromise} from '../utils';
import {Link} from './Link';
import {Icon} from './Icon';

export function Code ({children}) {
	const title = Array.isArray(children) ? children[0] : null;
	const code = Array.isArray(children) ? children[1] : children;
	return (
		<div className='codeblock'>
			{createTitleBlock(title)}
			<pre>{createCodeBlock(code)}</pre>
		</div>
	);
}

function createTitleBlock(title) {
	if (!title) {
		return null;
	}
	return (<div className='title'>{title}</div>);
}

function createCodeBlock(code) {
	if (code.type === 'code') {
		return code;
	}
	return (<code>{code}</code>);
}