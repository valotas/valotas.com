import * as React from 'react';
import {ArticleDescription} from '../content/ArticleDescription';
import {MetaFileStore} from '../content/MetaFileStore';
import {Icon} from './Icon'

interface GistProps extends React.Props<any> {
	gistId: string;
	user?: string;
	file?: string;
}

interface GistState {
	content:string
}

export class Gist extends React.Component<GistProps, GistState> {
	context: {
		fetcher: Fetcher
	}
	
	static contextTypes: React.ValidationMap<any> = {
		fetcher: React.PropTypes.object
	}
	
	constructor(props) {
		super(props);
		this.state = {
			content: null
		};
	}
	
	componentDidMount() {
		const fetcher = this.context.fetcher;
		const user = this.props.user || 'valotas';
		if (!fetcher) {
			return;
		}
		fetcher.fetch(`https://gist.githubusercontent.com/${user}/${this.props.gistId}/raw/${this.props.file}`)
			.then((body) => {
				return body.text();
			})
			.then((content) => {
				this.setState({
					content: content
				});
			});
	}

	render() {
		return <pre data-gist-id={this.props.gistId}><code>{this.state.content}</code></pre>;
	}
}
