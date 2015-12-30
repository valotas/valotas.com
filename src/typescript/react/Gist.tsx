import * as React from 'react';
import {ArticleDescription} from '../content/ArticleDescription';
import {MetaFileStore} from '../content/MetaFileStore';
import {GistStore} from '../content/GistStore';
import {Icon} from './Icon'

interface GistProps extends React.Props<any>, GistDescription {
	
}

interface GistState {
	content:string
}

export class Gist extends React.Component<GistProps, GistState> {
	private listener;
	private content;
	
	context: {
		gistStore: GistStore
	}
	
	static contextTypes: React.ValidationMap<any> = {
		gistStore: React.PropTypes.object
	}
	
	constructor(props, context) {
		super(props, context);

		this.state = {
			content: null
		};
		
		this.listener = context.gistStore.onGist(({gist, content}) => {
			if (gist !== props) {
				return;
			}
			this.content = content;
			this.setState({
				content: content
			});
		});
	}
	
	componentWillMount() {
		this.context.gistStore.load(this.props);
	}
	
	componentWillUnmount() {
		this.listener();
	}
	
	render() {
		const content = this.state.content || this.content;
		const user = this.props.user || 'valotas';
		return <pre data-gist-id={this.props.gistId} data-gist-user={user} data-gist-file={this.props.file}><code>{content}</code></pre>;
	}
}