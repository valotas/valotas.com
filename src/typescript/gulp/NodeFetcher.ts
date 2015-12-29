import nfetch = require('node-fetch');

export class NodeFetcher implements Fetcher {
	promises: Promise<Response>[] = [];
	_fetch;
	
	constructor(delegate: Fetcher) {
		this._fetch = delegate ? delegate.fetch : nfetch;
	}
	
	fetch (url: string|Request, init?: RequestInit) {
		console.log('fetching', url);
		const promise = this._fetch(url, init);
		this.promises.push(promise);
		return promise;
	}
	
	all () {
		return Promise.all(this.promises);
	}
}

