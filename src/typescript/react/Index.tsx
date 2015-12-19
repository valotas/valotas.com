import * as React from 'react';
import {Article} from '../content/Article';
import {Icon} from './Icon'

interface IndexProps extends React.Props<any> {
	articles: Article[];
}

export class Index extends React.Component<IndexProps, {}> {	
	render() {
		return (
			<div>
				{this.props.articles.map(this.createArticleBox)}
			</div>
		);
	}
	
	createArticleBox(article: Article) {
		return (<ArticleDescription article={article} key={article.key} />);
	}
}

interface ArticleDescriptionProps extends React.Props<any> {
	article: Article;
	key: string;
}

class ArticleDescription extends React.Component<ArticleDescriptionProps, {}> {
	render() {
		const article = this.props.article;
		return (
			<div>
				<h1>{article.title}</h1>
				<p>{article.description()}</p>
			</div>
		);
	}
}