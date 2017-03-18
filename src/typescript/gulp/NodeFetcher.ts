import nfetch = require('node-fetch');
import { createDirectory } from './Directory.factory';
import { isString } from '../utils';

export class NodeFetcher implements Fetcher {
  private cache: Directory;

  constructor(private delegate: Fetcher, cacheDir: string) {
    this.cache = createDirectory(cacheDir);
  }

  fetch(url: string | Request, init?: RequestInit) {
    const fileName = createCacheFileName(url);
    return this.cache.readFile(fileName)
      .then(createResponse, (err) => {
        return this.fetchAndCache(fileName, url, init);
      });
  }

  private fetchAndCache(fileName: string, url: string | Request, init?: RequestInit) {
    const fetch = (this.delegate ? this.delegate.fetch : nfetch) as Fetch;
    return fetch(url, init)
      .then((resp) => resp.text())
      .then((text) => {
        return this.cache.writeFile(fileName, text);
      })
      .then(createResponse);
  }
}

function createCacheFileName(urlOrRequest: string | Request) {
  const url = isString(urlOrRequest) ? urlOrRequest : urlOrRequest.url;
  return url.replace(/\:|\//g, '-');
}

function createResponse(text: string): Response {
  return {
    text: () => Promise.resolve(text)
  } as Response;
}
