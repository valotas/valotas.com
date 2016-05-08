import * as React from 'react';
import {Article} from '../content/Article';
import {MetaFileStore} from '../content/MetaFileStore';
import {Link} from './Link';
import {Icon} from './Icon';
import {Header} from './Header';
import {MarkedComponent} from './MarkedComponent';
import {VALOTAS} from '../utils';

interface IndexProps extends React.Props<any> {
	articles: Article[];
	metafileStore?: MetaFileStore;
}

export function IndexWithHeader (props: IndexProps){
	return (
		<div>
			<Header title={VALOTAS} subtitle="Things to remember | Programming stuff :)"/>
			<div id="content" className="container">
				<Index articles={props.articles} metafileStore={props.metafileStore}/>
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
	
	createArticleBox(article: Article, index: number) {
		if (article === null) {
			return <div className="clearfix" key={index} />
		}
		
		return (
			<ArticleDescriptionComponent article={article} key={article.key} metafileStore={this.props.metafileStore}/>
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

interface ArticleDescriptionComponentProps extends React.Props<any> {
	article: Article;
	key: string;
	metafileStore?: MetaFileStore;
}

function ArticleDescriptionComponent (props: ArticleDescriptionComponentProps) {
	const article = props.article;
	const description = article.description();
	return (
		<div className="col-md-4">
			<div className="article">
				<h2 className="header">
					<Link article={article} className="" metafileStore={props.metafileStore}>
						{article.title}
					</Link>
				</h2>
				<span className="badge date">{article.date()}</span>
				<div className="descr">
					<MarkedComponent markFirstLetter={false}>{description}</MarkedComponent>
					<p className="more">
						<Link article={article} className="btn btn-primary" metafileStore={props.metafileStore}>
							more&nbsp;
							<Icon name="fa-angle-double-right"/>
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}