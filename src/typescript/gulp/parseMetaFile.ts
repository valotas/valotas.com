import * as through from 'through2';
import * as path from 'path';
import {MetaFile} from '../content/MetaFile';

export function parseMetaFile(clone = true) {
	return through.obj(function (file, enc, callback) {
		callback(null, createFile(file, enc));
	});
}

function createFile (file, enc) {
	const f = file.path ? path.parse(file.path) : null;
	if (f && f.ext === '.md') {
		// extract the header info
		const content = file.contents.toString(enc);
		const mdfile = MetaFile.createFromRawMd(content);
		if (!mdfile.published) {
			return null;
		}
		mdfile.path = computeMdFilePath(f);
		file.meta = mdfile;
	}
	return file;
}

function computeMdFilePath(file) {
	if (file.name !== 'index') {
		return file.name;
	}
	const parent = path.parse(file.dir);
	return parent.name;
}