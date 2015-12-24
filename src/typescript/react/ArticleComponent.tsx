import * as React from 'react';
import {Article} from '../content/Article';
import {Icon} from './Icon';
import {Link} from './Link';
import {Header} from './Header';
import {VALOTAS} from '../utils';

interface ArticleProps extends React.Props<any> {
	article?: Article;
}

export class ArticleWithHeaderComponent extends React.Component<ArticleProps, {}> {
	render() {
		const article = this.props.article;
		return (
			<div>
				<Header title={article.title} subtitle={VALOTAS} date={article.date('DD/MM/YYYY')} />
				<div id="content" className="container">
					<ArticleComponent article={this.props.article} />
				</div>
			</div>
		);
	}
}

export class ArticleComponent extends React.Component<ArticleProps, {}> {	
	render() {
		const article = this.props.article;
		if (!article) {
			return null;
		}
		const html = {
			__html: article.html()
		};
		return (
			<div>
				<div className="article">
					<section className="content" dangerouslySetInnerHTML={html} />
				</div>
				<div id="footer-actions" className="row text-center">
					<div className="btn-group">
						<Link className="btn btn-default">
							<Icon name="fa-home" size="2x"/>
						</Link>
						<a href="#" className="btn btn-default">
							<Icon name="fa-toggle-up" size="2x"/>
						</a>
					</div>
				</div>
			</div>
		);
	}
}
