import { MetaFileData, Fetcher } from '../types';
import { PackageJson } from '../PackageJson';
import { h, Component } from 'preact';
import { MetaFile } from '../content/MetaFile';
import { LoadingBar } from './LoadingBar';
import { Footer } from './Footer';
import { MetaFileStore } from '../content/MetaFileStore';
import { GistStore } from '../content/GistStore';
import { isArray } from '../utils';
import * as ex from '../exceptions';
import { BROWSER } from '../browser/Browser';
import { FetchStreamer } from '../FetchStreamer';
import { LayoutMainContent } from './LayoutMainContent';

export interface PageProps {
  meta?: MetaFileData | MetaFileData[];
  metafileStore?: MetaFileStore;
  fetcher?: Fetcher;
  gistStore?: GistStore;
  pkg: PackageJson;
}

interface PageState {
  meta: MetaFile | MetaFile[];
}

// http://staxmanade.com/2015/08/playing-with-typescript-and-jsx/
export class Page extends Component<PageProps, PageState> {
  constructor(props: PageProps) {
    super(props);
    this.state = {
      meta: MetaFile.fromData(props.meta)
    };
  }

  /*static childContextTypes: React.ValidationMap<any>; = {
    metafileStore: React.PropTypes.object,
    fetcher: React.PropTypes.object,
    gistStore: React.PropTypes.object
  };*/

  getChildContext() {
    return {
      metafileStore: this.props.metafileStore,
      fetcher: FetchStreamer.wrap(this.props.fetcher),
      gistStore: this.props.gistStore
    };
  }

  componentDidMount() {
    const { metafileStore } = this.props;
    if (!metafileStore) {
      throw ex.illegalArgumentException('MetaFileStore is needed on the client side to register for changes');
    }
    metafileStore.onChange((meta: MetaFile) => {
      this._updateState(meta);
    });

    if (!BROWSER) {
      throw ex.illegalArgumentException('window is needed on the client side to register for PopStateEvents');
    }
    BROWSER.history.onPopState(this._setPageState);
  }

  _setPageState = (page: PageState) => {
    const meta = page ? MetaFile.fromData(page.meta) : null;
    if (this.props.gistStore) {
      this.props.gistStore.meta = isArray(meta) ? null : meta;
    }
    this._updateState(meta);
  }

  private _updateState(metaOrNull: MetaFile | MetaFile[]) {
    const meta = metaOrNull || MetaFile.fromData(this.props.meta);
    this.setState({
      meta: meta
    });
  }

  render({ pkg }, { meta }) {
    return (
      <div>
        <LoadingBar />
        <LayoutMainContent meta={meta} />
        <Footer pkg={pkg} />
      </div>
    );
  }
}
