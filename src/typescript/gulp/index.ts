import * as path from 'path';
import * as through from 'through2';
import {createArticle} from '../content/Article';
import {MetaFile, isValidMetaFile} from '../content/MetaFile';
import {CacheableGistStore} from './CacheableGistStore';
import {Layout} from '../react/Layout';
import {compareMoments} from '../utils';
import * as React from 'react';
import * as RDS from 'react-dom/server';
import File = require('vinyl'); // how to use import File from 'vinyl'?
import nfetch = require('node-fetch');
import * as gutil from 'gulp-util';

export {mdFile} from './mdFile';
export {adaptPaths} from './adaptPaths';
export {wrapHtml} from './wrapHtml';
export {addSitemap} from './addSitemap';
export {addMetafiles} from './addMetaFiles';

const NODE_FETCHER = {
	fetch: nfetch
};

const layout = React.createFactory(Layout);

export function toArticle (givenFetcher?: Fetcher) {
	const fetcher = givenFetcher || NODE_FETCHER;
	return through.obj(function (file: GulpFile, enc, callback) {
		const meta = file.meta;
		if (isValidMetaFile(meta)) {
			file.article = createArticle(meta);
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

export function addIndex() {
	let metas: MetaFile[] = [];
	let cwd;
	let enc;
	return through.obj(function (file, enc, callback) {
		const article = file.article;
		if (article /* && article instanceof Article */) {
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
