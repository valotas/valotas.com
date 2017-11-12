import * as fs from 'vinyl-fs';
import * as path from 'path';
import * as through from 'through2';
import { parseMetaFile, toArticle, adaptPaths, addMetafiles, addIndex } from './index';

const noopLogger = {
  log(message?: any, ...optionalParams: any[]) {

  }
};

describe('parseMetaFile', () => {
  it('should parse the meta as yalm', done => {
    fs.src(['src/articles/tomcat-initd-*.md'], {
      base: path.join(__dirname, '../../')
    })
      .pipe(parseMetaFile())
      .pipe(through.obj(function (chunk, enc, cb) {
        const mdfile = chunk.meta;
        expect(mdfile).toBeTruthy();
        expect(mdfile.title).toBeTruthy();
        expect(mdfile.date).toBeTruthy();
        expect(mdfile.path).toEqual('tomcat-initd-script');
        cb();
      }))
      .on('finish', done);
  });

  it('should not pass non published files to the pipe chain', done => {
    let chunk;
    fs.src(['src/articles/documenting-code.md'], {
      base: path.join(__dirname, '../../')
    })
      .pipe(parseMetaFile())
      .pipe(through.obj(function (_chunk, enc, cb) {
        chunk = _chunk;
        cb(null, chunk);
      }))
      .on('finish', function () {
        expect(chunk).toBeFalsy();
        done();
      });
  });
});

describe('toArticle', () => {
  it('should add an article/meta property to the given chunk', done => {
    fs.src(['src/articles/getters-and-setters.md'], {
      base: path.join(__dirname, '../../')
    })
      .pipe(parseMetaFile())
      .pipe(toArticle())
      .pipe(through.obj(function (chunk, enc, cb) {
        expect(chunk.article).toBeDefined();
        // expect(chunk.article instanceof Article).toBeTruthy();
        expect(chunk.meta).toBeTruthy();
        cb();
      }))
      .on('finish', done);
  });

  it('should not be applied no mdfile is available', done => {
    fs.src(['src/articles/tomcat-initd-*.md'], {
      base: path.join(__dirname, '../../')
    })
      .pipe(toArticle())
      .pipe(through.obj(function (chunk, enc, cb) {
        expect(chunk.path).toContain('tomcat-initd-script.md');
        cb();
      }))
      .on('finish', done);
  });
});

describe('adaptPaths', () => {
  it('should adapt the path of the given chunk if it is an md file', done => {
    fs.src(['src/articles/tomcat-initd-*.md'], {
      base: path.join(__dirname, '../../')
    })
      .pipe(parseMetaFile())
      .pipe(adaptPaths())
      .pipe(through.obj(function (chunk, enc, cb) {
        expect(chunk.path).toContain('tomcat-initd-script/index.html');
        cb();
      }))
      .on('finish', done);
  });
});

describe('addMetafiles', () => {
  it('should add a meta.json for each file with a meta property containing it', done => {
    let counter = 0;
    fs.src(['src/articles/tomcat-initd-*.md'], {
      base: path.join(__dirname, '../../')
    })
      .pipe(parseMetaFile())
      .pipe(addMetafiles(noopLogger))
      .pipe(through.obj(function (chunk, enc, cb) {
        counter++;
        if (!chunk.meta) {
          expect(chunk.path).toContain('tomcat-initd-script/meta.json');
        }
        cb();
      }))
      .on('finish', function () {
        expect(counter).toEqual(2);
        done();
      });
  });
});

describe('addIndex', () => {
  it('should add an index.html and error.html', done => {
    const paths = [];
    fs.src(['src/articles/tomcat-initd-*.md'], {
      base: path.join(__dirname, '../../')
    })
      .pipe(parseMetaFile())
      .pipe(toArticle())
      .pipe(addIndex(noopLogger))
      .pipe(through.obj(function ({ path }, enc, cb) {
        const index = path.indexOf('/src/');
        paths.push(path.substring(index + 5));
        cb();
      }))
      .on('finish', function () {
        expect(paths).toContain('index.html');
        done();
      });
  });
});
