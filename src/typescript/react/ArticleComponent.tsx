import * as React from 'react';
import {Icon} from './Icon';
import {Link} from './Link';
import {Header} from './Header';
import {VALOTAS} from '../utils';
import {MetaFileStore} from '../content/MetaFileStore';
import {loadTwitter} from '../browser/Twitter';
import {MarkedComponent} from './MarkedComponent';

interface ArticleProps {
	article?: Article;
	metafileStore: MetaFileStore;
}

export function ArticleWithHeaderComponent ({article, metafileStore}: ArticleProps) {
	return (
		<div>
			<Header title={article.title} subtitle={VALOTAS} date={article.date('DD/MM/YYYY')} metafileStore={metafileStore}/>
			<ArticleComponent article={article} metafileStore={metafileStore}/>
		</div>
	);
}

export class ArticleComponent extends React.Component<ArticleProps, {}> {
	private html;

	render() {
		const {article} = this.props;
		if (!article) {
			return null;
		}
		return (
			<div id='content' className='container'>
				<div className='article'>
					<section className='content'>
						<MarkedComponent meta={article.meta}/>
					</section>
				</div>
				<div id='footer-actions' className='row text-center'>
					<div className='btn-group'>
						<Link className='btn btn-default' metafileStore={this.props.metafileStore}>
							<Icon name='fa-home' size='sm-2x'/>
                            <span className='hidden-xs hidden-sm'>&nbsp;Home</span>
						</Link>
						<Link href='#' className='btn btn-default'>
							<span className='hidden-xs hidden-sm'>Top&nbsp;</span>
                            <Icon name='fa-toggle-up' size='sm-2x'/>
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
        if (!this.props.article.hasTweets()) {
			return;
		}
		loadTwitter().then((twttr) => {
			twttr.widgets.load();
		});
	}

	componentDidUpdate() {
		this._loadTwitterWidgets();
	}
}
