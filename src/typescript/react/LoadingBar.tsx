import { h, Component } from 'preact';
import { FetchStreamer } from '../FetchStreamer';
import { noop } from '../utils';

interface LoadingBarState {
  loading: number;
}

export class LoadingBar extends Component<any, LoadingBarState> {
  context: {
    fetcher: FetchStreamer;
  };

  private onFetchRegistration;

  /*  static contextTypes: React.ValidationMap<any> = {
      fetcher: React.PropTypes.object
    };
  */

  constructor(props) {
    super(props);
    this.state = {
      loading: 0
    };
    this.onFetchRegistration = noop;
  }

  componentDidMount() {
    this.onFetchRegistration = this.context.fetcher.onFetch(promise => {
      this.add(1);
      promise.then(result => {
        setTimeout(() => {
          this.add(-1);
        }, 15);
        return result;
      });
    });
  }

  componentWillUnmount() {
    this.onFetchRegistration();
  }

  add(addition: number) {
    const newLoading = this.state.loading + addition;
    if (newLoading < 0) {
      return;
    }
    this.setState({
      loading: newLoading
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { loading } = this.state;
    if (loading === nextState.loading) {
      return false;
    }
    if (loading > 0 && nextState.loading > 0) {
      return false;
    }
    return true;
  }

  render(_, { loading }) {
    const classNames = `loading-bar ${loading ? 'loading' : ''}`;
    return (
      <div className={classNames}>
        <div className="loading-bar-inner" />
      </div>
    );
  }
}
