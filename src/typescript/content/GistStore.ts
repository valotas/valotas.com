import {MetaFile, isValidMetaFile} from './MetaFile';
import {ArticleDescription} from './ArticleDescription';
import {Gist} from '../react/Gist';
import * as ex from '../exceptions';

interface ListenerInput {
	gist: GistDescription,
	content: string;
}

export class GistStore {
	private components = [];
	private states = {};
	
	constructor(public fetcher: Fetcher) {

	}
	
	register(component: Gist) {
		this.components.push(component);
		const updated = this.updateComponentState(component); 
		if (updated) {
			return;
		}
		this.load(component.props);
	}
	
	unregister(component: Gist) {
		const index = this.components.indexOf(component);
		this.components.splice(index, 1);
	}
	
	private load(input: GistDescription) {
		const url = this.createUrl(input);
		return this._load(url)
			.then((content) => {
				this.states[url] = content;
				this.updateComponentStates();
			});
	}
	
	private createUrl(input: GistDescription) {
		const user = input.user || 'valotas';
		return `https://gist.githubusercontent.com/${user}/${input.gistId}/raw/${input.file}`;
	}
	
	_load(url: string) {
		return this.fetcher
			.fetch(url)
			.then((body) => body.text());
	}
	
	private updateComponentStates() {
		this.components.forEach((comp) => {
			this.updateComponentState(comp);	
		})
	}
	
	private updateComponentState(comp: Gist) {
		const url = this.createUrl(comp.props);
		const content = this.states[url];
		if (!content) {
			return false;
		}	
		comp.setState({
			content: content
		});
		return true;
	}
}