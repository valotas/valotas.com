import { MetaFileData, Fetcher } from '../types';
import { Article } from './Article';
import { MetaFile, isValidMetaFile } from './MetaFile';
import { Bus } from '../Bus';
import { isString } from '../utils';
import * as ex from '../exceptions';

function isArticle(input: any): input is Article {
  return input.key;
}

type MetaFileOrArray = MetaFile | MetaFile[];

export class MetaFileStore {
  private bus: Bus<MetaFileOrArray> = new Bus();

  constructor(private fetcher: Fetcher) {}

  load(input: string | Article) {
    const url = this._createUrl(input);
    return this._loadMetaFile(url).then(meta => this.setMetaFile(meta));
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
    throw ex.illegalFromatException(
      'Can not create a url from given input: ' + input
    );
  }

  _loadMetaFile(url: string) {
    return this.fetcher
      .fetch(url)
      .then(body => body.json())
      .then((json: any) =>
        MetaFile.fromData(json as MetaFileData | MetaFileData[])
      );
  }

  setMetaFile(meta: MetaFileOrArray) {
    this.bus.notify(meta);
    return meta;
  }

  onChange(listener: (meta: MetaFileOrArray) => void) {
    return this.bus.register(listener);
  }
}
