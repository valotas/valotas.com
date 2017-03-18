import * as through from 'through2';
import * as path from 'path';
import { MetaFile } from '../content/MetaFile';

export function parseMetaFile(clone = true) {
  return through.obj(function (file, enc, callback) {
    callback(null, createFile(file, enc));
  });
}

function createFile(file, enc) {
  const f = file.path ? path.parse(file.path) : null;
  if (!f) {
    return file;
  }
  // extract the header info
  const content = file.contents.toString(enc);
  let meta = null;
  if (f.ext === '.md') {
    meta = MetaFile.createFromRawMd(content);
  }
  if (f.ext === '.json') {
    meta = MetaFile.createFromJson(content);
  }
  if (!meta) {
    return file;
  }
  if (!meta.published) {
    return null;
  }

  meta.path = computeMdFilePath(f);
  file.meta = meta;
  return file;
}
function computeMdFilePath(file) {
  if (file.name !== 'index') {
    return file.name;
  }
  const parent = path.parse(file.dir);
  return parent.name;
}
