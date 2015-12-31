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

export class Link extends React.Component<LinkProps, any> {
	context: {
		metafileStore: MetaFileStore
	}
	static contextTypes: React.ValidationMap<any> = {
		metafileStore: React.PropTypes.object
	};
	
	handleClick (e) {
		if (this.props.href === '#') {
			e.preventDefault();
			window.scrollTo(0, 0);
			return;
		}
		
		if (this.props.target !== '_self') {
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
		const target = this.props.target || '_self';
		return <a href={href} className={this.props.className} onClick={this.handleClick.bind(this)} target={target}>{this.props.children}</a>;
	}
	createHref() {
		let href = '/';
		const article = this.props.article;
		if (article) {
			href += article.key;
		}
		return href;
	}
}
