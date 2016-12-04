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

function Index ({articles, metafileStore}: IndexProps) {
		return (<div className='container main'>{toArticleCards(articles, metafileStore)}</div>);
}

function toArticleCards(articles: Article[], metafileStore: MetaFileStore) {
	const lastIndex = articles.length - 1;
	return articles.map((article, index) => <ArticleCardComponent article={article} key={article.key} metafileStore={metafileStore} index={index} last={lastIndex === index}/>);

}

interface ArticleDescriptionComponentProps {
	article: Article;
	key: string;
	metafileStore?: MetaFileStore;
	index: number;
	last: boolean;
}

function ArticleCardComponent ({article, metafileStore, index, last}: ArticleDescriptionComponentProps) {
	const description = article.description();
	let className = 'article-card';
	if ((index + 1) % 3 === 1) {
		className += ' first';
	}
	if (last) {
		className += ' end';
	}
	return (
		<div className={className}>
			<div className='article'>
				<h2>
					<Link article={article} className='' metafileStore={metafileStore}>
						{article.title}
					</Link>
				</h2>
				<span className='label date'>{article.date()}</span>
				<div className='descr text-justify'>
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