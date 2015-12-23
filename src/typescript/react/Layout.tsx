import * as React from 'react';
import {Article} from '../content/Article';
import {ArticleDescription} from '../content/ArticleDescription';
import {MetaFile} from '../content/MetaFile';
import {ArticleComponent} from './ArticleComponent';
import {Index} from './Index';
import {Header} from './Header';
import {Footer} from './Footer';
import {MetaFileStore} from '../content/MetaFileStore';

/* Stateless functional components are not supported yet?
export function Layout() {
	return (<div className="lol">Layout here</div>);
}
*/

interface LayoutProps extends React.Props<any> {
	meta?: MetaFile|MetaFile[];
	metafileStore?: MetaFileStore;
}

interface LayoutState {
	meta: MetaFile|MetaFile[];
}

//http://staxmanade.com/2015/08/playing-with-typescript-and-jsx/
export class Layout extends React.Component<LayoutProps, LayoutState> {
	constructor(props: LayoutProps) {
		super(props);
		this.state = {
			meta: props.meta
		}
	}
	
	componentDidMount() {
		const store = this.props.metafileStore;
		if (!store) {
			return;
		}
		store.onChange((meta: MetaFile) => {
			console.log('Updateting state', meta);
			this.setState({
				meta: meta
			});
		});
	}
	
	render() {
		const content = this.createMainContent()
		return (
			<div>
				<Header title="The title" subtitle="the subtitle" />
				<div id="content" className="container">
					{content}
				</div>
				<Footer/>
			</div>
		);
	}
	
	private createMainContent() {
		const meta = this.props.meta;

		if (isMetaArray(meta)) {
			const articles =  toArticles(meta)
			return <Index articles={articles} metafileStore={this.props.metafileStore}/>;
		}

		if (meta) {
			const article = new Article(meta as MetaFile);
			return <ArticleComponent article={article} />;		
		}
		return null;
	}
}

function toArticles (arr: MetaFile[]): ArticleDescription[] {
	return arr.map((input) => new ArticleDescription(input));
}

function isMetaArray (input: any): input is MetaFile[] {
	return input && input.length;
}