import nfetch = require('node-fetch');
import {GistStore} from '../content/GistStore';

export class CacheableGistStore extends GistStore {
	private promises: {[k: string]: Promise<string>} = {};
	
	constructor(public fetcher: Fetcher) {
		super(fetcher);
	}
	
	_load(url: string) {
		const promise = this.promises[url] || super._load(url);
		this.promises[url] = promise;
		return promise;
	}
	
	all () {
		return Promise.all(Object.keys(this.promises).map((k) => this.promises[k]));
	}
}
