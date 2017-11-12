import * as through from 'through2';
import * as path from 'path';
import { GulpFile } from './gulp-types';
import { isValidMetaFile } from '../content/MetaFile';

export function adaptPaths() {
  return through.obj(function(file: GulpFile, enc, callback) {
    const meta = file.meta;
    if (isValidMetaFile(meta)) {
      file.path = path.join(file.base, meta.path, 'index.html');
    }
    callback(null, file);
  });
}
