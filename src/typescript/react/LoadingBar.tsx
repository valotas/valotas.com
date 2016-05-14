import * as React from 'react';
import {FetchStreamer} from '../FetchStreamer';

interface LoadingBarState {
    loading: number;
}

export class LoadingBar extends React.Component<React.Props<any>, LoadingBarState> {
	context: {
		fetcher: FetchStreamer
	};

	static contextTypes: React.ValidationMap<any> = {
		fetcher: React.PropTypes.object
	};

    constructor (props, context) {
        super(props, context);
        this.state = {
            loading: 0
        };
    }

    componentDidMount() {
        this.context.fetcher.onFetch((promise) => {
            this.add(1);
            promise.then((result) => {
                this.add(-1);
                return result;
            });
        });
    }

    add(addition: number) {
        this.setState({
            loading: this.state.loading + addition
        });
    }

    render() {
        const classNames = `loading-bar ${this.state.loading ? 'loading' : ''}`;
		return (
			<div className={classNames}>
                <div className='loading-bar-inner'></div>
            </div>
		);
	}
}
