import { Fetcher } from './types';
import { BROWSER } from './browser/Browser';
import { Bus } from './Bus';

interface ResponseListener {
  (promise: Promise<Response>): void;
}

export class FetchStreamer implements Fetcher {
  private bus: Bus<Promise<Response>> = new Bus();

  constructor(private delegate: Fetcher = BROWSER) {}

  fetch(url: string | Request, init?: RequestInit) {
    const promise = this.delegate.fetch(url, init);
    this.bus.notify(promise);
    return promise;
  }

  onFetch(listener: ResponseListener) {
    return this.bus.register(listener);
  }

  static wrap(fetcher: Fetcher | FetchStreamer) {
    if (isFetchStreamer(fetcher)) {
      return fetcher;
    }
    return new FetchStreamer(fetcher);
  }
}

function isFetchStreamer(input: any): input is FetchStreamer {
  return input && input.onFetch;
}
