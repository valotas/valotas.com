import {WIN} from './Window';

interface ResponseListener {
    (promise: Promise<Response>): void;
}

export class FetchStreamer implements Fetcher {
    private listeners: ResponseListener[] = [];
    
    constructor (private delegate: Fetcher = WIN) {}
    
    fetch (url: string|Request, init?: RequestInit) {
        const promise = this.delegate.fetch(url, init);
        this.listeners.forEach((l) => {
            l(promise);
        });
        return promise;
    }
    
    onFetch (listener: ResponseListener) {
        this.listeners.push(listener);
        return () => {
            const index = this.listeners.indexOf(listener);
			this.listeners.splice(index, 1);
        }
    }
    
    static wrap (fetcher: Fetcher|FetchStreamer) {
        if (isFetchStreamer(fetcher)) {
            return fetcher;
        }
        return new FetchStreamer(fetcher);
    }
}

function isFetchStreamer (input: any): input is FetchStreamer {
    return input.onFetch;
}
