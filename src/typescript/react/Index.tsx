import * as React from 'react';
import {ArticleDescription} from '../content/ArticleDescription';
import {MetaFileService} from '../content/MetaFileService';
import {Link} from './Link';
import {Icon} from './Icon';

interface IndexProps extends React.Props<any> {
	articles: ArticleDescription[];
	metafileService?: MetaFileService;
}

export class Index extends React.Component<IndexProps, {}> {	
	render() {
		const articles = addSeparators(this.props.articles);
		return (
			<div id="index-content">
				{articles.map(this.createArticleBox.bind(this))}
			</div>
		);
	}
	
	createArticleBox(article: ArticleDescription, index: number) {
		if (article === null) {
			return <div className="clearfix" key={index} />
		}
		
		return (
			<ArticleDescriptionComponent article={article} key={article.key} metafileService={this.props.metafileService}/>
		);
	}
}

function addSeparators(articles: ArticleDescription[]) {
	const result = [];
	articles.forEach((article, index) => {
		result.push(article);
		if ((index + 1) % 3 === 0) {
			result.push(null);
		}
	});
	return result;
}

interface ArticleDescriptionComponentProps extends React.Props<any> {
	article: ArticleDescription;
	key: string;
	metafileService?: MetaFileService;
}

class ArticleDescriptionComponent extends React.Component<ArticleDescriptionComponentProps, {}> {
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
					<div className="descr">
						<div dangerouslySetInnerHTML={html}/>
						<p className="more">
							<Link article={article} className="btn btn-primary" metafileService={this.props.metafileService}>
								more&nbsp;
								<Icon name="fa-angle-double-right"/>
							</Link>
						</p>
					</div>
				</div>
			</div>
		);
	}
}