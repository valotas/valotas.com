import * as through from 'through2';
import * as path from 'path';
import { isValidMetaFile } from '../content/MetaFile';
import * as gutil from 'gulp-util';
import { CacheableGistStore } from './CacheableGistStore';
import { Page } from '../react/Page';
import { h } from 'preact';
import render from 'preact-render-to-string';
import { NodeFetcher } from './NodeFetcher';

const NODE_FETCHER = new NodeFetcher(null, '/tmp/valotas.com.createLayoutHtml');

export function createLayoutHtml(pkg: PackageJson, fetcher: Fetcher = NODE_FETCHER, logger: Logger = gutil) {
  return through.obj(function (file: GulpFile, enc, callback) {
    if (file.meta) {
      renderLayout(file, fetcher, pkg).then(function (html) {
        file.html = html;
        callback(null, file);
      }, function (er) {
        logger.log('Could not create html', file.path, er);
        callback(er);
      });
    } else {
      callback(null, file);
    }
  });
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
    .then((all) => {
      return render(page);
    });
}

