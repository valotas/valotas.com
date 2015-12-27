import * as path from 'path';
import * as through from 'through2';
import {Article} from '../content/Article';
import {ArticleDescription} from '../content/ArticleDescription';
import {MetaFile} from '../content/MetaFile';
import {Layout} from '../react/Layout';
import {deflate,compareMoments} from '../utils';
import * as React from 'react';
import * as RDS from 'react-dom/server';
import * as jade from 'jade';
import File = require('vinyl'); //how to use import File from 'vinyl'?

export function mdFile(clone = true) {
	return through.obj(function (file, enc, callback) {
		const f = file.path ? path.parse(file.path) : null;
		if (f && f.ext === '.md') {
			//extract the header info
			const content = file.contents.toString(enc);
			const mdfile = MetaFile.create(content);
			if (!mdfile.published) {
				callback(null);
				return;
			}
			mdfile.path = computeMdFilePath(f);
			file.mdfile = mdfile;
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

export function toArticle () {
	return through.obj(function (file, enc, callback) {
		const mdfile = file.mdfile;
		if (mdfile) {
			file.article = new Article(mdfile);
			file.html = createLayoutHtml(mdfile);
		}
		this.push(file);
		callback();
	});
}

function createLayoutHtml(meta: MetaFile|MetaFile[]):string {
	const layout = React.createElement(Layout, {
		meta: meta
	});
	return RDS.renderToString(layout);
}

export function adaptPaths () {
	return through.obj(function (file, enc, callback) {
		const mdfile = file.mdfile;
		if (mdfile) {
			file.path = path.join(file.base, mdfile.path, 'index.html');
		}
		callback(null, file);
	});
}

export function wrapHtml(templateFile) {
	var template = jade.compileFile(templateFile);
	return through.obj(function (file, enc, callback) {
		if (file.html) {
			const html = template({
				content: file.html,
				meta: deflate(file.meta)
			});
			file.contents = new Buffer(html, enc);
		}
		this.push(file);
		callback();
	});
}

export function addIndex() {
	let metas: MetaFile[] = [];
	let cwd; 
	let enc;
	return through.obj(function (file, enc, callback) {
		const article = file.article;
		if (article && article instanceof Article) {
			cwd = file.cwd;
			enc = enc;
			metas.push(createDescriptionMetaFile(article));
		}
		callback(null, file);
	}, function (callback) {
		const index = new File({
			cwd: cwd,
			base: path.join(cwd, 'src'),
			path: path.join(cwd, 'src', 'index.html')
		}) as any;
		index.html = createLayoutHtml(metas);
		index.meta = metas.sort(compareMoments);
		index.meta.path = '';
		this.push(index);
		callback();
	});
}

function createDescriptionMetaFile(article: Article) {
	const meta = new MetaFile(article.meta);
	meta.raw = null;
	meta.description = article.description();
	return meta;
}

export function addMetafiles() {
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
		}
		callback(null, file);
	});
}