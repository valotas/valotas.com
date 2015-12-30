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
	}
	
	componentWillMount() {
		this.context.gistStore.register(this);
	}
	
	componentWillUnmount() {
		this.context.gistStore.deregister(this);
	}
	
	render() {
		const content = this.state.content || this.content;
		const user = this.props.user || 'valotas';
		return <pre data-gist-id={this.props.gistId} data-gist-user={user} data-gist-file={this.props.file}><code>{content}</code></pre>;
	}
}
