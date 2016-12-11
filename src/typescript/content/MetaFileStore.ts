import { MetaFile, isValidMetaFile } from './MetaFile';
import { isString } from '../utils';
import * as ex from '../exceptions';

function isArticle(input: any): input is Article {
  return input.key;
}

export class MetaFileStore {
  private listeners: Function[] = [];

  constructor(private fetcher: Fetcher) {

  }

  load(input: string | Article) {
    const url = this._createUrl(input);
    return this._loadMetaFile(url)
      .then((meta) => {
        return this.setMetaFile(meta);
      });
  }

  _createUrl(input: string | Article) {
    if (isString(input)) {
      let url = input as string;
      if (url.indexOf('/') !== 0) {
        url = '/' + url;
      }
      if (url.lastIndexOf('/') < url.length - 1) {
        url += '/';
      }
      return url + 'meta.json';
    }
    if (isArticle(input)) {
      return '/' + input.key + '/meta.json';
    }
    throw ex.illegalFromatException('Can not create a url from given input: ' + input);
  }

  _loadMetaFile(url: string) {
    return this.fetcher
      .fetch(url)
      .then((body) => body.json())
      .then((json) => MetaFile.fromData(json as MetaFileData | MetaFileData[]));
  }

  setMetaFile(meta: MetaFile | MetaFile[]) {
    this.listeners.forEach((listener) => listener(meta));
    return meta;
  }

  onChange(listener: (meta: MetaFile | MetaFile[]) => void) {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      this.listeners.splice(index, 1);
    };
  }
}
