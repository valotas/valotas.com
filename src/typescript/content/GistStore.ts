import {MetaFile, MetaFileData, isValidMetaFile} from './MetaFile';
import {ArticleDescription} from './ArticleDescription';
import * as ex from '../exceptions';

interface ListenerInput {
	gist: GistDescription,
	content: string;
}

export class GistStore {
	private listeners: Function[] = [];
	
	constructor(public fetcher: Fetcher) {

	}
	
	load(input: GistDescription) {
		const user = input.user || 'valotas';
		const url = `https://gist.githubusercontent.com/${user}/${input.gistId}/raw/${input.file}`;
		return this._load(url)
			.then((content) => {
				const notification = {
					gist: input,
					content: content
				}
				this.listeners.forEach((l) => l(notification));
			});
	}
	
	_load(url: string) {
		return this.fetcher
			.fetch(url)
			.then((body) => body.text());
	}
	
	onGist(listener: (input: ListenerInput) => void) {
		this.listeners.push(listener);
		return () => {
			const index = this.listeners.indexOf(listener);
			this.listeners.splice(index, 1);
		};
	}
}