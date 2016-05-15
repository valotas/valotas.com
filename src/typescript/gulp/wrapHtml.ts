import * as jade from 'jade';
import * as through from 'through2';
import * as gutil from 'gulp-util';
import {deflate} from '../utils';
import {createTitle} from '../titleFactory';

export function wrapHtml(templateFile) {
	const template = jade.compileFile(templateFile);
	return through.obj(function (file: GulpFile, enc, callback) {
		if (file.html) {
			const html = template({
				title: createTitle(file.meta || null),
				content: file.html,
				meta: deflate(file.meta)
			});
			file.contents = new Buffer(html, enc);
            gutil.log('Created', file.path);
		}
		callback(null, file);
	});
}