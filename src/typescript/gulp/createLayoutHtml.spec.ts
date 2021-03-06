import * as fs from 'vinyl-fs';
import * as path from 'path';
import * as through from 'through2';
import { PackageJson } from '../PackageJson';
import {
  parseMetaFile,
  toArticle,
  adaptPaths,
  addMetafiles,
  createLayoutHtml
} from './index';

describe('createLayoutHtml', () => {
  const pkg: PackageJson = {
    name: 'the name',
    version: '666'
  };
  const resp = {} as Response;
  const dummyFetcher = {
    fetch: function() {
      return Promise.resolve(resp);
    }
  };

  it('should add an html with the rendered layout to the given file', done => {
    fs.src(['src/articles/better-angular-*.md'], {
      base: path.join(__dirname, '../../')
    })
      .pipe(parseMetaFile())
      .pipe(createLayoutHtml(pkg, dummyFetcher))
      .pipe(
        through.obj(function(chunk, enc, cb) {
          expect(chunk.html).toBeTruthy();
          cb();
        })
      )
      .on('finish', done);
  });

  it('should not add the html attribute if no meta attribute is found', done => {
    fs.src(['src/robots.txt'], {
      base: path.join(__dirname, '../../')
    })
      .pipe(createLayoutHtml(pkg, dummyFetcher))
      .pipe(
        through.obj(function(chunk, enc, cb) {
          expect(chunk.html).toBeUndefined();
          cb(null, chunk);
        })
      )
      .on('finish', done);
  });
});
