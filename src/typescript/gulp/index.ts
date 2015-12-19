import * as path from 'path';
import * as through from 'through2';
import {Article} from '../content/Article';
import {MdFile} from '../content/MdFile';
import {Layout} from '../react/Layout';
import {escapeTags} from '../utils';
import * as React from 'react';
import * as RDS from 'react-dom/server';
import * as jade from 'jade';
import File = require('vinyl'); //how to use import File from 'vinyl'?

function cloneWithNewPath(origin) {
	const file = origin.clone();
	const p = path.parse(file.path);
	if (p.name !== 'index') {
		file.path = path.join(p.dir, '_md', p.base);
	} else {
		const parent = path.parse(p.dir);
		if (parent.name === 'src') {
			return null;
		}
		file.path = path.join(parent.dir, '_md', parent.base, p.base);
	}
	return file;
}

export function mdFile(clone = true) {
	return through.obj(function (file, enc, callback) {
		const f = file.path ? path.parse(file.path) : null;
		if (f && f.ext === '.md') {
			var cloned = clone ? cloneWithNewPath(file) : null;
			if (cloned) {
				this.push(cloned);
			}
			//extract the header info
			const content = file.contents.toString(enc);
			const mdfile = MdFile.create(content);
			mdfile.path = file.path;
			file.mdfile = mdfile;
		}
		this.push(file);
		callback();
	}); 
}

export function toArticle () {
	return through.obj(function (file, enc, callback) {
		const mdfile = file.mdfile;
		if (mdfile) {
			file.article = new Article(mdfile);
			file.html = createLayoutHtml(mdfile);
			file.path = createIndexPath(file.path);
		}
		this.push(file);
		callback();
	});
}

function createLayoutHtml(mdfile: MdFile, articles?: Article[]):string {
	const layout = React.createElement(Layout, {
		mdfile: mdfile,
		articles: articles
	});
	return RDS.renderToString(layout);
}

function createIndexPath(filePath: string) {
	const p = path.parse(filePath);
	if (p.name !== 'index') {
		return path.join(p.dir, p.name, 'index.html')
	}
	return path.join(p.dir, 'index.html');
}

export function wrapHtml(templateFile) {
	var template = jade.compileFile(templateFile);
	return through.obj(function (file, enc, callback) {
		if (file.html) {
			const html = template({
				content: file.html,
				mdfile: escapeTags(JSON.stringify(file.mdfile))
			});
			file.contents = new Buffer(html, enc);
		}
		this.push(file);
		callback();
	});
}

export function addIndex() {
	let articles: Article[] = [];
	let cwd; 
	let enc;
	return through.obj(function (file, enc, callback) {
		const article = file.article;
		if (article && article instanceof Article) {
			cwd = file.cwd;
			enc = enc;
			articles.push(article);
		}
		this.push(file);
		callback();
	}, function () {
		const index = new File({
			cwd: cwd,
			base: path.join(cwd, 'src'),
			path: path.join(cwd, 'src', 'index.html')
		}) as any;
		index.html = createLayoutHtml(null, articles);
		this.push(index);
	});
}