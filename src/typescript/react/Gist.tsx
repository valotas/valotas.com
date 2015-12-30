import * as React from 'react';
import {ArticleDescription} from '../content/ArticleDescription';
import {MetaFileStore} from '../content/MetaFileStore';
import {Icon} from './Icon'

interface GistProps extends React.Props<any> {
	gistId: string;
	file: string;
	user?: string;
}

interface GistState {
	content:string
}

export class Gist extends React.Component<GistProps, GistState> {
	promisedContent;
	content;
	
	context: {
		fetcher: Fetcher
	}
	
	static contextTypes: React.ValidationMap<any> = {
		fetcher: React.PropTypes.object
	}
	
	constructor(props, context) {
		super(props, context);

		this.state = {
			content: null
		};

		const fetcher = context.fetcher;
		if (!fetcher) {
			return;
		}
		
		const user = props.user || 'valotas';
		this.promisedContent = fetcher.fetch(`https://gist.githubusercontent.com/${user}/${props.gistId}/raw/${props.file}`)
			.then((body) => {
				return body.text();
			})
			.then((content) => {
				this.content = content;
			});
	}
	
	componentDidMount() {
		this.promisedContent.then((content) => {
			this.setState({
				content: content
			});
		});
	}
	
	render() {
		const content = this.state.content || this.content;
		const user = this.props.user || 'valotas';
		console.log(this.content, this.promisedContent);
		return <pre data-gist-id={this.props.gistId} data-gist-user={user} data-gist-file={this.props.file}><code>{content}</code></pre>;
	}
}
