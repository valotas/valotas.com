import * as React from 'react';
import {Article} from '../content/Article';
import {Icon} from './Icon'

interface IndexProps extends React.Props<any> {
	articles: Article[];
}

export class Index extends React.Component<IndexProps, {}> {	
	render() {
		const articles = addSeparators(this.props.articles);
		return (
			<div id="index-content">
				{articles.map(this.createArticleBox)}
			</div>
		);
	}
	
	createArticleBox(article: Article, index: number) {
		if (article === null) {
			return <div className="clearfix" key={index} />
		}
		
		return (
			<ArticleDescription article={article} key={article.key} />
		);
	}
}

function addSeparators(articles: Article[]) {
	const result = [];
	articles.forEach((article, index) => {
		result.push(article);
		if ((index + 1) % 3 === 0) {
			result.push(null);
		}
	});
	return result;
}

interface ArticleDescriptionProps extends React.Props<any> {
	article: Article;
	key: string;
}

class ArticleDescription extends React.Component<ArticleDescriptionProps, {}> {
	render() {
		const article = this.props.article;
		const html = {
			__html: article.description()
		};
		return (
			<div className="col-md-4">
				<div className="article">
					<h2 className="header">{article.title}</h2>
					<span className="badge date">{article.date()}</span>
					<div className="descr" dangerouslySetInnerHTML={html} />
				</div>
			</div>
		);
	}
}