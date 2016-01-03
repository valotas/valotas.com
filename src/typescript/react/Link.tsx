import * as React from 'react';
import {ArticleDescription} from '../content/ArticleDescription';
import {MetaFileStore} from '../content/MetaFileStore';
import {Icon} from './Icon'

interface LinkProps extends React.Props<any> {
	article?: ArticleDescription;
	href?: string;
	metafileStore?: MetaFileStore;
	className?: string;
	target?: string;
}

export function Link (props: LinkProps, context: {metafileStore?: MetaFileStore}) {
	const href = props.href || createHref(props.article);
	const onclick = handleClick.bind(null, props, context);
	return <a href={href} className={props.className} onClick={onclick} target={props.target}>{props.children}</a>;
}

Link.prototype.contextTypes = {
	metafileStore: React.PropTypes.object
};

function handleClick (props: LinkProps, context,  e) {
	const {href, target} = props;
	if (href === '#') {
		e.preventDefault();
		window.scrollTo(0, 0);
		return;
	}
	
	if (target === '_blank' || (href && href.indexOf('http') === 0)) {
		return;
	}

	const store = props.metafileStore || context.metafileStore;
	if (!store) {
		return;
	}
	
	e.preventDefault();
	store.load(props.article || href || '/');
}

function createHref(article?: ArticleDescription) {
	let href = '/';
	if (article) {
		href += article.key;
	}
	return href;
}