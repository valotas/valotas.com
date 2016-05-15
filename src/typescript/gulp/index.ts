import * as path from 'path';
import * as through from 'through2';
import {createArticle} from '../content/Article';
import {MetaFile, isValidMetaFile} from '../content/MetaFile';
import {compareMoments} from '../utils';
import File = require('vinyl'); // how to use import File from 'vinyl'?
import * as gutil from 'gulp-util';

export {mdFile} from './mdFile';
export {adaptPaths} from './adaptPaths';
export {wrapHtml} from './wrapHtml';
export {addSitemap} from './addSitemap';
export {addMetafiles} from './addMetaFiles';
export {createLayoutHtml} from './createLayoutHtml';

export function toArticle () {
	return through.obj(function (file: GulpFile, enc, callback) {
		const meta = file.meta;
		if (isValidMetaFile(meta)) {
			file.article = createArticle(meta);	
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
