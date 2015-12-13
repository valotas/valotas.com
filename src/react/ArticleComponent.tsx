import * as React from 'react';
import {Article} from '../fs/Article';
import {Icon} from './Icon'

interface ArticleProps extends React.Props<any> {
	article?: Article;
} 

export class ArticleComponent extends React.Component<ArticleProps, {}> {	
	render() {
		var article = this.props.article;
		if (!article) {
			return null;
		}
		return (
			<div>
				<div className="article">
					<section className="content">
						{article.html()}
					</section>
				</div>
				<div id="footer-actions" className="row text-center">
					<div className="btn-group">
						<a href="/" className="btn btn-default">
							<Icon name="fa-home"/>
						</a>
						<a href="#" className="btn btn-default">
							<Icon name="fa-toggle-up"/>
						</a>
					</div>
				</div>
			</div>
		);
	}
}