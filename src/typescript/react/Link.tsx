import * as React from 'react';
import {ArticleDescription} from '../content/ArticleDescription';
import {Icon} from './Icon'

interface LinkProps extends React.Props<any> {
	article?: ArticleDescription;
	className: string;
} 

export class Link extends React.Component<LinkProps, {}> {	
	render() {
		var href = '/';
		const article = this.props.article;
		if (article) {
			href += article.key;
		}
		return <a href={href} className={this.props.className}>{this.props.children}</a>;
	}
}
