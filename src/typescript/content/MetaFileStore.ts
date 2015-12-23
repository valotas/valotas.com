import {MetaFile} from './MetaFile';

export class MetaFileStore {
	private listeners: Function[] = [];
	
	constructor(private fetch: (url: string|Request, init?: RequestInit) => Promise<Response>) {

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
		return this.fetch('/' + key)
			.then((body) => {
				return body.json();
			})
			.then((json) => {
				const meta = json as MetaFile;
				return new MetaFile(meta);
			});
	}
	
	onChange(listener: Function) {
		this.listeners.push(listener);
		return () => {
			const index = this.listeners.indexOf(listener);
			this.listeners.splice(index, 1);
		};
	}
}