import * as React from 'react';
import {ArticleDescription} from '../content/ArticleDescription';
import {MetaFileStore} from '../content/MetaFileStore';
import {GistStore} from '../content/GistStore';
import {Icon} from './Icon';
import {isPromise} from '../utils';

interface GistProps extends React.Props<any>, GistDescription {
	
}

interface GistState {
	content:string
}

export class Gist extends React.Component<GistProps, GistState> {
	private contentPromise: Promise<string>;
	
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
		
		const {gistStore} =  this.context;
		if (!gistStore) {
			return;
		}
		const content = gistStore.load(this.props);
		
		if (isPromise(content)) {
			this.contentPromise = content;	
		} else {
			this.state = { content: content };
		}
	}
	
	componentDidMount() {
		if (!this.contentPromise) {
			return;
		}
		this.contentPromise.then((content) => {
			this.setState({
				content: content
			});
		});
	}
	
	render() {
		const user = this.props.user || 'valotas';
		return <pre data-gist-id={this.props.gistId} data-gist-user={user} data-gist-file={this.props.file}><code>{this.state.content}</code></pre>;
	}
}
