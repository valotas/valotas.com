import * as React from 'react';
import {Article} from '../content/Article';
import {Icon} from './Icon'

interface LinkProps extends React.Props<any> {
	article?: Article;
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
