import { MetaFileData, Fetcher } from '../types';
import { MetaFileStore } from './MetaFileStore';
import { MetaFile } from './MetaFile';

describe('MetaFileStore', () => {
  let fetcher;
  let store: MetaFileStore;

  beforeEach(() => {
    fetcher = {
      fetch: function () {

      }
    };
    store = new MetaFileStore(fetcher);
  });

  it('should have a way to add new listeners', () => {
    store.onChange(function () { });
  });

  it('should have provide a way to load new metafiles', () => {
    const meta = new MetaFile();
    spyOn(store, '_loadMetaFile').and.returnValue(Promise.resolve(meta));

    store.load('123');

    expect(store._loadMetaFile).toHaveBeenCalledWith('/123/meta.json');
  });

  it('should notify the listeners of newly loaded metafiles', (done) => {
    const meta = new MetaFile();
    const listener = jasmine.createSpy('listener');
    spyOn(store, '_loadMetaFile').and.returnValue(Promise.resolve(meta));

    store.onChange(listener);
    store.load('123')
      .then(() => {
        expect(listener).toHaveBeenCalledWith(meta);
      })
      .then(done);
  });

  it('should return a function to deregister listener', (done) => {
    const meta = new MetaFile();
    const listener = jasmine.createSpy('listener');
    spyOn(store, '_loadMetaFile').and.returnValue(Promise.resolve(meta));

    const deregister = store.onChange(listener);
    expect(deregister).toBeTruthy();
    deregister();

    store.load('123')
      .then(() => {
        expect(listener).not.toHaveBeenCalledWith(meta);
      })
      .then(done);
  });

  describe('_createUrl', () => {
    it('should add the meta.json at the end if the path is the root: /', () => {
      const actual = store._createUrl('/');
      expect(actual).toEqual('/meta.json');
    });

    it('should create urls starting with /', () => {
      const actual = store._createUrl('key');
      expect(actual).toEqual('/key/meta.json');
    });

    it('should not duplicate trailing /', () => {
      const actual = store._createUrl('key/');
      expect(actual).toEqual('/key/meta.json');
    });
  });

  describe('_loadMetaFile', () => {
    const meta1: MetaFileData = {
      title: 'title1',
      path: 'path1',
      type: 'article',
      date: null
    };

    const meta2: MetaFileData = {
      title: 'title2',
      path: 'path2',
      type: 'article',
      date: null
    };

    let body;

    it('should fetch the meta.json', (done) => {
      body = {
        json: function () {
          return Promise.resolve(meta1);
        }
      };
      spyOn(fetcher, 'fetch').and.returnValue(Promise.resolve(body));

      store
        .load('any')
        .then((actual) => {
          expect(actual).toEqual(new MetaFile(meta1));
          expect(fetcher.fetch).toHaveBeenCalledWith('/any/meta.json');
        })
        .then(done);
    });

    it('should also allow arrays of metafiles', (done) => {
      body = {
        json: function () {
          return Promise.resolve([meta1, meta2]);
        }
      };
      spyOn(fetcher, 'fetch').and.returnValue(Promise.resolve(body));

      store
        .load('any')
        .then((actual) => {
          expect(actual).toEqual([new MetaFile(meta1), new MetaFile(meta2)]);
        })
        .then(done);
    });
  });
});
