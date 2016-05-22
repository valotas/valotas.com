import nfetch = require('node-fetch');
import {createDirectory} from './Directory.factory';
import {isString} from '../utils';

export class NodeFetcher implements Fetcher {
	private promises: {[k: string]: Promise<Response>} = {};
	private cache: Directory;

	constructor(private delegate: Fetcher, cacheDir: string) {
		this.cache = createDirectory(cacheDir);
	}

	fetch (url: string|Request, init?: RequestInit) {
		const key = url as string;
		const promise = this.promises[key] || this._fetch(url, init);
		this.promises[key] = promise;
		return promise;
	}

	_fetch (url: string|Request, init?: RequestInit) {
		const fileName = createCacheFileName(url);
		return this.cache.readFile(fileName)
			.then((text) => {
				return {
					text: () => Promise.resolve(text)
				} as Response;
			}, (err) => {
				return this.fetchAndCache(fileName, url, init);
			});
	}

	private fetchAndCache(fileName: string, url: string|Request, init?: RequestInit) {
		const fetch = this.delegate ? this.delegate.fetch : nfetch;
		let response;
		return fetch(url, init)
			.then((resp) => {
				response = resp;
				return resp.text();
			})
			.then((text) => {
				return this.cache.writeFile(fileName, text);
			})
			.then(() => {
				return response;
			});
	}

	all () {
		return Promise.all(Object.keys(this.promises).map((k) => this.promises[k]));
	}
}

function createCacheFileName(urlOrRequest: string|Request) {
	const url = isString(urlOrRequest) ? urlOrRequest : urlOrRequest.url;
	return url.replace(/\:|\//g, '-');
}
