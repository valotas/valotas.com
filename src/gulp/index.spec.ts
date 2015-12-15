import * as fs from 'vinyl-fs';
import * as path from 'path';
import * as through from 'through2';
import {mdFile, toArticle} from './index';

describe('mdFile', () => {	
	it('should parse the mdfile as yalm', (done) => {
		fs.src(['src/articles/tomcat-initd-*.md'], {
				base: path.join(__dirname, '../../')
			})
			.pipe(mdFile(false))
			.pipe(through.obj(function (chunk, enc, cb) {
				const mdfile = chunk.mdfile;
				expect(mdfile).toBeTruthy();
				expect(mdfile.title).toBeTruthy();
				expect(mdfile.date).toBeTruthy();
				cb();
			}))
			.on('finish', done);
	});
	
	it('should by default clone each file to a different path',(done) => {
		fs.src(['src/articles/tomcat-initd-*.md'], {
				base: path.join(__dirname, '../../')
			})
			.pipe(mdFile())
			.pipe(through.obj(function (chunk, enc, cb) {
				if (!chunk.mdfile) {
					expect(chunk.path).toContain('/_md/tomcat-initd');
				}
				cb();
			}))
			.on('finish', done);
	});
	
	it('should respect the file structure',(done) => {
		fs.src(['src/articles/dart-language/*.md'], {
				base: path.join(__dirname, '../../')
			})
			.pipe(mdFile())
			.pipe(through.obj(function (chunk, enc, cb) {
				if (!chunk.mdfile) {
					expect(chunk.path).toContain('/_md/dart-language/');
				}
				cb();
			}))
			.on('finish', done);
	})
});

describe('toArticle', () => {
	it('should adapt the path of the given chunk if it is an md file', (done) => {
		let indexCounter = 0;
		fs.src(['src/articles/tomcat-initd-*.md'], {
				base: path.join(__dirname, '../../')
			})
			.pipe(mdFile(false))
			.pipe(toArticle())
			.pipe(through.obj(function (chunk, enc, cb) {
				expect(chunk.path).toContain('tomcat-initd-script/index.html')
				cb();
			}))
			.on('finish', done);
		
	});
	
	it('should not be applied no mdfile is available', (done) => {
		fs.src(['src/articles/tomcat-initd-*.md'], {
				base: path.join(__dirname, '../../')
			})
			.pipe(toArticle())
			.pipe(through.obj(function (chunk, enc, cb) {
				expect(chunk.path).toContain('tomcat-initd-script.md')
				cb();
			}))
			.on('finish', done);
		
	});
});
