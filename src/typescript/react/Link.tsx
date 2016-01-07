import * as React from 'react';
import {Article} from '../content/Article';
import {MetaFileStore} from '../content/MetaFileStore';
import {Icon} from './Icon'

interface LinkProps extends React.Props<any> {
	article?: Article;
	href?: string;
	metafileStore?: MetaFileStore;
	className?: string;
	target?: string;
}

export class Link extends React.Component<LinkProps, any> {
	context: {
		metafileStore: MetaFileStore
	};

	static contextTypes: React.ValidationMap<any> = {
		metafileStore: React.PropTypes.object
	};
	
	handleClick (e) {
		const {href, target} = this.props;
		if (href === '#') {
			e.preventDefault();
			window.scrollTo(0, 0);
			return;
		}
		
		if (target === '_blank' || (href && href.indexOf('http') === 0)) {
			return;
		}

		const store = this.props.metafileStore || this.context.metafileStore;
		if (!store) {
			return;
		}
		
		e.preventDefault();
		store.load(this.props.article || this.props.href || '/');
	}
	render() {
		const href = this.props.href || this.createHref();
		return <a href={href} className={this.props.className} onClick={this.handleClick.bind(this)} target={this.props.target}>{this.props.children}</a>;
	}
	createHref() {
		let href = '/';
		const article = this.props.article;
		if (article) {
			href += `${article.key}/`;
		}
		return href;
	}
}
