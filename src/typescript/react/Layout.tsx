import * as React from 'react';
import {Article} from '../content/Article';
import {MetaFile} from '../content/MetaFile';
import {ArticleWithHeaderComponent} from './ArticleComponent';
import {IndexWithHeader} from './Index';
import {Header} from './Header';
import {Footer} from './Footer';
import {MetaFileStore} from '../content/MetaFileStore';
import {GistStore} from '../content/GistStore';
import {isArray} from '../utils';
import * as ex from '../exceptions';
import {BROWSER} from '../browser/Browser';
import {FetchStreamer} from '../FetchStreamer';
import {createTitle} from '../titleFactory';

interface LayoutProps extends React.Props<any> {
	meta?: MetaFile|MetaFile[];
	metafileStore?: MetaFileStore;
	fetcher?: Fetcher;
	gistStore?: GistStore;
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
		metafileStore: React.PropTypes.object,
		fetcher: React.PropTypes.object,
		gistStore: React.PropTypes.object
	};
	
	getChildContext() {
		return {
			metafileStore: this.props.metafileStore,
			fetcher: FetchStreamer.wrap(this.props.fetcher),
			gistStore: this.props.gistStore
		}
	}
	
	componentDidMount() {
		const {metafileStore} = this.props;
		if (!metafileStore) {
			throw ex.illegalArgumentException('MetaFileStore is needed on the client side to register for changes');
		}
		metafileStore.onChange((meta: MetaFile) => {
			this._setMetaFile(meta);
		});

		if (!BROWSER) {
			throw ex.illegalArgumentException('window is needed on the client side to register for PopStateEvents');
		}
		BROWSER.onPopstate(this._setPageState.bind(this));
	}
	
	_setPageState(page: PageState) {
		const meta = MetaFile.fromData(page.meta);
		if (BROWSER) {
			BROWSER.title(page.title);
		}
		if (this.props.gistStore) {
			this.props.gistStore.meta = isArray(meta) ? null : meta;
		}
		this._setMetaFile(meta);
	}
	
	_setMetaFile(metaOrNull: MetaFile|MetaFile[]) {
		const meta = metaOrNull || this.props.meta;
		this.setState({
			meta: meta
		});
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

		if (isArray(meta)) {
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

function toArticles (arr: MetaFile[]): Article[] {
	return arr.map((input) => new Article(input));
}
