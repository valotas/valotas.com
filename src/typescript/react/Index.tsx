import * as React from 'react';
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

export function IndexWithHeader (props: IndexProps) {
	return (
		<div>
			<Header title={VALOTAS} subtitle='Things to remember | Programming stuff :)'/>
			<Index articles={props.articles} metafileStore={props.metafileStore}/>
		</div>
	);
}

export function Index ({articles}: IndexProps) {
		return (<div className='container'>{toArticleRows(articles)}</div>);
}

function toArticleRows(articles: Article[]) {
	const result = [];

	let triplet: Article[] = [];
	articles.forEach((article, index) => {
		triplet.push(article)
		if ((index + 1) % 3 === 0) {
			const row = <ArticleRow articles={triplet} />; 
			result.push(row);
			triplet = [];
		}
	});
	
	return result;
}

function ArticleRow ({articles, metafileStore}: IndexProps) {
	return (
		<div className='article-cards-row container'>
			{articles.map((article) => <ArticleCardComponent article={article} key={article.key} metafileStore={metafileStore}/>)}
		</div>	
	);
}

interface ArticleDescriptionComponentProps extends React.Props<any> {
	article: Article;
	key: string;
	metafileStore?: MetaFileStore;
}

function ArticleCardComponent ({article, metafileStore}: ArticleDescriptionComponentProps) {
	const description = article.description();
	return (
		<div className='article-card'>
			<div className='article'>
				<h2>
					<Link article={article} className='' metafileStore={metafileStore}>
						{article.title}
					</Link>
				</h2>
				<span className='label date'>{article.date()}</span>
				<div className='descr'>
					<MarkedComponent markFirstLetter={false}>{description}</MarkedComponent>
					<p className='more text-right'>
						<Link article={article} className='button' metafileStore={metafileStore}>
							more&nbsp;
							<Icon name='fa-angle-double-right'/>
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}