import * as fs from 'vinyl-fs';
import * as path from 'path';
import * as through from 'through2';
import {mdHeader} from './index';

describe('mdHeader', () => {	
	it('should parse the header as yalm', (done) => {
		fs.src(['src/articles/**/*.md'], {
				base: path.join(__dirname, '../../')
			})
			.pipe(mdHeader())
			.pipe(through.obj(function (chunk, enc, cb) {
				console.log(chunk.path, chunk.header);
				expect(chunk.header).toBeTruthy();
				cb();
			}))
			.on('finish', done);
	});
});
