import * as through from 'through2';

export function mdHeader() {
	return through.obj(function (file, enc, callback) {
		if (file.path && file.path.indexOf('.md') === file.path.length - 3) {
			//extract the header info
			file.header = 'dummy header';
		}
		this.push(file);
		callback();
	}); 
}

export function transform () {
	return through.obj(function (file, enc, callback) {
		console.log('chunk', file.isStream(), file.path, file.contents);
		this.push(file);
		callback();
	});
}