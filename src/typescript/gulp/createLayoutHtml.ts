import * as through from 'through2';
import * as path from 'path';
import * as gutil from 'gulp-util';
import { h } from 'preact';
import * as render from 'preact-render-to-string';
import { GulpFile, Logger } from './gulp-types';
import { Fetcher } from '../types';
import { PackageJson } from '../PackageJson';
import { isValidMetaFile } from '../content/MetaFile';
import { CacheableGistStore } from './CacheableGistStore';
import { Page } from '../react/Page';
import { NodeFetcher } from './NodeFetcher';

export function createLayoutHtml(pkg: PackageJson, fetcher: Fetcher = null, logger: Logger = gutil) {
  const actualFetcher = fetcher || createNodeFetcher(logger);
  return through.obj(function (file: GulpFile, enc, callback) {
    if (file.meta) {
      renderLayout(file, actualFetcher, pkg).then((html) => {
        file.html = html;
        callback(null, file);
      }, (er) => {
        logger.log('Could not create html', file.path, er);
        callback(er);
      });
    } else {
      callback(null, file);
    }
  });
}

function createNodeFetcher(logger: Logger) {
  return new NodeFetcher(null, '/tmp/valotas.com.createLayoutHtml', logger);
}

function renderLayout(file: GulpFile, fetcher: Fetcher, pkg: PackageJson): Promise<string> {
  const meta = file.meta;
  const store = new CacheableGistStore(fetcher, isValidMetaFile(meta) ? meta : null);
  const page = h(Page, {
    meta: meta,
    fetcher: fetcher,
    gistStore: store,
    pkg: pkg
  });
  // initial rendering to cause the initialization of all our components
  try {
    render(page);
  } catch (ex) {
    ex.message += `. Could not render ${file.path}`;
    return Promise.reject(ex);
  }
  return store.all()
    .then((all) => render(page));
}

