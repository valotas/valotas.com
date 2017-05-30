import * as fs from 'fs';
import { NodeFetcher } from './NodeFetcher';
import { isPromise } from '../utils';
import { createDirectory } from './Directory';

describe('NodeFetcher', () => {
  const body = 'body text';
  const dir = '/tmp/NodeFetcher.spec';
  const resp = {
    text: () => {
      return Promise.resolve(body);
    }
  } as Response;
  const dummyFetcher = {
    fetch: function () {
      return Promise.resolve(resp);
    }
  };

  let random;
  let fetcher: NodeFetcher;

  beforeEach(() => {
    random = Math.random().toString(36).substring(2);
    fetcher = new NodeFetcher(dummyFetcher, dir);
  });

  describe('fetch', () => {
    it('should delegate the call to given fetcher', (done) => {
      const fetcherSpy = spyOn(dummyFetcher, 'fetch').and.callThrough();
      const url = `http://some/url/to/fetch/${random}`;
      const actual = fetcher.fetch(url);

      // expect(fetcherSpy).toHaveBeenCalledWith(url);
      actual
        .then((data) => data.text())
        .then((text) => {
          expect(text).toEqual(body);
        })
        .then(done, done.fail);
    });

    it('should cache the returned output', (done) => {
      const url = `some/url/to/fetch/${random}`;

      fetcher.fetch(url)
        .then(() => {
          const directory = createDirectory(dir);
          return directory.readFile(url.replace(/\//g, '-'));
        })
        .then((data) => {
          expect(data).toEqual(body);
        })
        .then(done, done.fail);
    });

    it('should not delegate calls to given fetcher once the response is cached', (done) => {
      const url = `some/url/to/fetch/${random}`;
      const fetchSpy = spyOn(dummyFetcher, 'fetch').and.callThrough();

      fetcher.fetch(url)
        .then(() => {
          return fetcher.fetch(url);
        })
        .then((data) => {
          return fetcher.fetch(url);
        })
        .then(() => {
          expect(fetchSpy.calls.count()).toBe(1);
        })
        .then(done, done.fail);
    });
  });
});
