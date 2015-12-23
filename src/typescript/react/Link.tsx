import * as React from 'react';
import {ArticleDescription} from '../content/ArticleDescription';
import {MetaFileService} from '../content/MetaFileService';
import {Icon} from './Icon'

interface LinkProps extends React.Props<any> {
	article?: ArticleDescription;
	metafileService?: MetaFileService;
	className: string;
}

export class Link extends React.Component<LinkProps, {}> {
	handleClick (e) {
		const metafileService = this.props.metafileService;
		if (!metafileService) {
			return;
		}
		e.preventDefault();
		console.log(metafileService, this.props.article);
		metafileService.load(this.props.article.key +'/meta.json')
			.then((body) => {
				console.log('fetched', body);
			})
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
