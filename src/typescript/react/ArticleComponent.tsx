import * as React from 'react';
import {Article} from '../content/Article';
import {Icon} from './Icon';
import {Link} from './Link';
import {Header} from './Header';
import {VALOTAS} from '../utils';
import {MetaFileStore} from '../content/MetaFileStore';
import {LOADER} from '../Loader';
import {MarkedComponent} from './MarkedComponent';

interface ArticleProps extends React.Props<any> {
	article?: Article;
	metafileStore: MetaFileStore;
}

export class ArticleWithHeaderComponent extends React.Component<ArticleProps, {}> {
	render() {
		const article = this.props.article;
		return (
			<div>
				<Header title={article.title} subtitle={VALOTAS} date={article.date('DD/MM/YYYY')} metafileStore={this.props.metafileStore}/>
				<div id="content" className="container">
					<ArticleComponent article={this.props.article} metafileStore={this.props.metafileStore}/>
				</div>
			</div>
		);
	}
}

export class ArticleComponent extends React.Component<ArticleProps, {}> {
	private html;
	
	render() {
		const article = this.props.article;
		if (!article) {
			return null;
		}
		this.html = {
			_html: article.html()
		};
		return (
			<div>
				<div className="article">
					<section className="content">
						<MarkedComponent meta={this.props.article.meta}/>
					</section>
				</div>
				<div id="footer-actions" className="row text-center">
					<div className="btn-group">
						<Link className="btn btn-default" metafileStore={this.props.metafileStore}>
							<Icon name="fa-home" size="2x"/>
						</Link>
						<Link href="#" className="btn btn-default">
							<Icon name="fa-toggle-up" size="2x"/>
						</Link>
					</div>
				</div>
			</div>
		);
	}
	
	componentDidMount() {
		this._loadTwitterWidgets();	
	}
	
	private _loadTwitterWidgets() {
		if (this.html.__html && this.html.__html.indexOf('twitter-tweet') < 0) {
			return;
		}
		LOADER.loadTwitter().then((twttr) => {
			console.log(twttr);
			twttr.widgets.load();
		});
	}
	
	componentDidUpdate() {
		this._loadTwitterWidgets();
	}
}
