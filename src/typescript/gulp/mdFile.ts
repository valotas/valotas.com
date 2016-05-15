import * as through from 'through2';
import * as path from 'path';
import {MetaFile} from '../content/MetaFile';

export function mdFile(clone = true) {
	return through.obj(function (file, enc, callback) {
		const f = file.path ? path.parse(file.path) : null;
		if (f && f.ext === '.md') {
			// extract the header info
			const content = file.contents.toString(enc);
			const mdfile = MetaFile.create(content);
			if (!mdfile.published) {
				callback(null);
				return;
			}
			mdfile.path = computeMdFilePath(f);
			file.meta = mdfile;
		}
		callback(null, file);
	});
}

function computeMdFilePath(file) {
	if (file.name !== 'index') {
		return file.name;
	}
	const parent = path.parse(file.dir);
	return parent.name;
}