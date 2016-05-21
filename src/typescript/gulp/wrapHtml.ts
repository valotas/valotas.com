import * as jade from 'jade';
import * as through from 'through2';
import * as gutil from 'gulp-util';
import {deflate} from '../utils';
import {createTitle} from '../titleFactory';
import {createPackageJson} from '../PackageJson.factory';

export function wrapHtml(templateFile, pkg) {
	const packageJson = createPackageJson(pkg);
	const template = jade.compileFile(templateFile);
	return through.obj(function (file: GulpFile, enc, callback) {
		if (file.html) {
			const html = template({
				title: createTitle(file.meta || null),
				content: file.html,
				meta: deflate(file.meta),
				pkg: `window.pkg=${JSON.stringify(packageJson)}`
			});
			file.contents = new Buffer(html, enc);
            gutil.log('Created', file.path);
		}
		callback(null, file);
	});
}