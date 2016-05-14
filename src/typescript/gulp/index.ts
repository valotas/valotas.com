import * as path from 'path';
import * as through from 'through2';
import {Article} from '../content/Article';
import {MetaFile, isValidMetaFile} from '../content/MetaFile';
import {CacheableGistStore} from './CacheableGistStore';
import {Layout} from '../react/Layout';
import {deflate, compareMoments} from '../utils';
import * as React from 'react';
import * as RDS from 'react-dom/server';
import * as jade from 'jade';
import File = require('vinyl'); // how to use import File from 'vinyl'?
import nfetch = require('node-fetch');
import * as gutil from 'gulp-util';
import {createTitle} from '../titleFactory';

const NODE_FETCHER = {
	fetch: nfetch
};

const layout = React.createFactory(Layout);

interface GulpFile {
	meta: MetaFile|MetaFile[];
	html?: string;
	article?: Article;
	contents?: any;
	path: string;
	base: string;
}

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

export function toArticle (givenFetcher?: Fetcher) {
	const fetcher = givenFetcher || NODE_FETCHER;
	return through.obj(function (file: GulpFile, enc, callback) {
		const meta = file.meta;
		if (isValidMetaFile(meta)) {
			file.article = new Article(meta);
			createLayoutHtml(file, fetcher).then(function (html) {
				file.html = html;
				callback(null, file);
			}, function (er) {
                gutil.log('Could not create html', file.path, er);
				callback(er);
			});
		} else {
			callback(null, file);
		}
	});
}

function createLayoutHtml(file: GulpFile, fetcher: Fetcher): Promise<string> {
	const meta = file.meta;
	const store = new CacheableGistStore(fetcher, isValidMetaFile(meta) ? meta : null);
	const layoutElement = layout({
		meta: meta,
		fetcher: fetcher,
		gistStore: store
	});
	// initial rendering to cause the initialization of all our components
	try {
        RDS.renderToString(layoutElement);
    } catch (ex) {
        ex.message += `. Could not render ${file.path}`;
        return Promise.reject(ex);
    }
	return store.all()
		.then((all) => {
			return RDS.renderToString(layoutElement);
		});
}

export function adaptPaths () {
	return through.obj(function (file: GulpFile, enc, callback) {
		const meta = file.meta;
		if (isValidMetaFile(meta)) {
			file.path = path.join(file.base, meta.path, 'index.html');
		}
		callback(null, file);
	});
}

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
		metas = metas.sort(compareMoments);
		index.meta = metas;
		index.meta.path = '';
		createLayoutHtml(index, NODE_FETCHER)
			.then((html) => {
				index.html = html;
				this.push(index);
				callback();
			}, function (err) {
                console.error(err);
                callback();
            });
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
            gutil.log('Created', index.path);
		}
		callback(null, file);
	});
}

export function addSitemap() {
	const sitemap: string[] = [];
	let cwd;
	let enc;
	return through.obj(function (file, enc, callback) {
		const meta = file.meta;
		if (meta) {
			cwd = file.cwd;
			enc = enc;
			sitemap.push(createSitemapEntry(meta));
		}
		callback(null, file);
	}, function (callback) {
		const file = new File({
			cwd: cwd,
			base: path.join(cwd, 'src'),
			path: path.join(cwd, 'src', 'sitemap.txt'),
			contents: new Buffer(sitemap.join('\n'), enc)
		}) as any;
		this.push(file);
		callback();
	});
}

function createSitemapEntry(meta) {
	let entry = 'http://valotas.com/' + meta.path;
	if (entry.lastIndexOf('/') !== entry.length - 1) {
		entry += '/';
	}
	return entry;
}