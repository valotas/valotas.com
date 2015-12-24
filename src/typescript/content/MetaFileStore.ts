import {MetaFile} from './MetaFile';

interface Fetcher {
	fetch: (url: string|Request, init?: RequestInit) => Promise<Response>
}

export class MetaFileStore {
	private listeners: Function[] = [];
	
	constructor(private fetcher: Fetcher) {

	}
	
	load(key: string) {
		return this._loadMetaFile(key)
			.then((meta) => {
				this.listeners.forEach((listener) => {
					listener(meta);
				});
				return meta;
			});
	}
	
	_loadMetaFile(key: string) {
		return this.fetcher
			.fetch('/' + key)
			.then((body) => {
				return body.json();
			})
			.then((json) => {
				const meta = json as MetaFile;
				return new MetaFile(meta);
			});
	}
	
	onChange(listener: (meta: MetaFile) => void) {
		this.listeners.push(listener);
		return () => {
			const index = this.listeners.indexOf(listener);
			this.listeners.splice(index, 1);
		};
	}
}