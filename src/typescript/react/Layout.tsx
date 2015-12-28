import * as React from 'react';
import {Article} from '../content/Article';
import {ArticleDescription} from '../content/ArticleDescription';
import {MetaFile, MetaFileData} from '../content/MetaFile';
import {ArticleWithHeaderComponent} from './ArticleComponent';
import {IndexWithHeader} from './Index';
import {Header} from './Header';
import {Footer} from './Footer';
import {MetaFileStore} from '../content/MetaFileStore';
import {VALOTAS} from '../utils';

/* Stateless functional components are not supported yet?
export function Layout() {
	return (<div className="lol">Layout here</div>);
}
*/

interface LayoutProps extends React.Props<any> {
	meta?: MetaFile|MetaFile[];
	metafileStore?: MetaFileStore;
	win?: Window
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
	
	static childContextTypes: React.ValidationMap<any> = {
		metafileStore: React.PropTypes.object
	};
	
	getChildContext() {
		return {
			metafileStore: this.props.metafileStore
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
		const win = this.props.win;
		if (!win) {
			return;
		}
		win.onpopstate = (ev: PopStateEvent) => {
			const state = MetaFile.fromData(ev.state as MetaFileData);
			const meta = state || this.props.meta;
			this.setState({
				meta: meta
			});
		}
	}
	
	render() {
		return (
			<div>
				{this.createMainContent()}
				<Footer/>
			</div>
		);
	}
	
	private createMainContent() {
		const meta = this.state.meta;

		if (isMetaArray(meta)) {
			const articles =  toArticles(meta);
			return <IndexWithHeader articles={articles} metafileStore={this.props.metafileStore}/>;
		}

		if (meta) {
			const article = new Article(meta as MetaFile);
			return <ArticleWithHeaderComponent article={article} metafileStore={this.props.metafileStore}/>;		
		}
		return null;
	}
}


function isMetaArray (input: any): input is MetaFile[]|ArticleDescription[] {
	return input && input.length;
}

function toArticles (arr: MetaFile[]): ArticleDescription[] {
	return arr.map((input) => new ArticleDescription(input));
}
