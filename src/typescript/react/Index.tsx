import * as React from 'react';
import {ArticleDescription} from '../content/ArticleDescription';
import {MetaFileStore} from '../content/MetaFileStore';
import {Link} from './Link';
import {Icon} from './Icon';
import {Header} from './Header';
import {VALOTAS} from '../utils';

interface IndexProps extends React.Props<any> {
	articles: ArticleDescription[];
	metafileStore?: MetaFileStore;
}

export function IndexWithHeader ({articles, metafileStore}: IndexProps) {
	return (
		<div>
			<Header title={VALOTAS} subtitle="Things to remember | Programming stuff :)"/>
			<div id="content" className="container">
				<Index articles={articles} metafileStore={metafileStore}/>
			</div>
		</div>
	);
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
			<ArticleDescriptionComponent article={article} key={article.key} metafileStore={this.props.metafileStore}/>
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
	metafileStore?: MetaFileStore;
}

function ArticleDescriptionComponent ({article, metafileStore}: ArticleDescriptionComponentProps) {
	const html = {
		__html: article.description()
	};
	return (
		<div className="col-md-4">
			<div className="article">
				<h2 className="header">
					<Link article={article} className="" metafileStore={metafileStore}>
						{article.title}
					</Link>
				</h2>
				<span className="badge date">{article.date()}</span>
				<div className="descr">
					<div dangerouslySetInnerHTML={html}/>
					<p className="more">
						<Link article={article} className="btn btn-primary" metafileStore={metafileStore}>
							more&nbsp;
							<Icon name="fa-angle-double-right"/>
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}