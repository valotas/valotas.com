import nfetch = require('node-fetch');

export class NodeFetcher implements Fetcher {
	private promises: {[k: string]: Promise<Response>} = {};
	_fetch;

	constructor(delegate: Fetcher) {
		this._fetch = delegate ? delegate.fetch : nfetch;
	}

	fetch (url: string|Request, init?: RequestInit) {
		const key = url as string;
		console.log(key, this.promises[key] ? true : false);
		const promise = this.promises[key] || this._fetch(url, init);
		this.promises[key] = promise;
		return promise;
	}

	all () {
		return Promise.all(Object.keys(this.promises).map((k) => this.promises[k]));
	}
}

