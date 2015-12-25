import * as React from 'react';
import {ArticleDescription} from '../content/ArticleDescription';
import {MetaFileStore} from '../content/MetaFileStore';
import {Icon} from './Icon'

interface LinkProps extends React.Props<any> {
	article?: ArticleDescription;
	metafileStore?: MetaFileStore;
	className: string;
}

export class Link extends React.Component<LinkProps, {}> {
	handleClick (e) {
		const store = this.props.metafileStore;
		if (!store) {
			return;
		}
		e.preventDefault();
		store.load(this.props.article || '/');
	}
	render() {
		var href = '/';
		const article = this.props.article;
		if (article) {
			href += article.key;
		}
		return <a href={href} className={this.props.className} onClick={this.handleClick.bind(this)}>{this.props.children}</a>;
	}
}
