import * as through from 'through2';
import * as gutil from 'gulp-util';
import File = require('vinyl'); // how to use import File from 'vinyl'?
import * as path from 'path';

export function addMetafiles(logger: Logger = gutil) {
	return through.obj(function (file, enc, callback) {
		const meta = file.meta;
		if (meta) {
			const index = new File({
				cwd: file.cwd,
				base: path.join(file.cwd, 'src'),
				path: path.join(file.cwd, 'src', meta.path, 'meta.json'),
				contents: new Buffer(JSON.stringify(meta), enc)
			});
			this.push(index);
            logger.log('Created', index.path);
		}
		callback(null, file);
	});
}
