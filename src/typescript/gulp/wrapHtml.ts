import { compileFile } from 'pug';
import * as through from 'through2';
import * as gutil from 'gulp-util';
import { deflate } from '../utils';
import { createTitle } from '../titleFactory';
import { createPackageJson } from '../PackageJson.factory';

export function wrapHtml(templateFile, pkg, logger: Logger = gutil) {
  const packageJson = JSON.stringify(createPackageJson(pkg));
  const template = compileFile(templateFile);
  return through.obj(function (file: GulpFile, enc, callback) {
    if (file.html) {
      const html = template({
        title: createTitle(file.meta || null),
        content: file.html,
        meta: deflate(file.meta),
        pkg: `window.pkg=${packageJson}`
      });
      file.contents = new Buffer(html, enc);
      logger.log('Added html content to Vinyl', file.path);
    }
    callback(null, file);
  });
}
