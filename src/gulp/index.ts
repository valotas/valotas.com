import * as path from 'path';
import * as through from 'through2';
import {Article} from '../fs/Article';
import {MdFile} from '../fs/MdFile';
import {Layout} from '../react/Layout';
import * as React from 'react';
import * as RDS from 'react-dom/server';

export function mdFile() {
	return through.obj(function (file, enc, callback) {
		if (file.path && file.path.indexOf('.md') === file.path.length - 3) {
			//extract the header info
			const content = file.contents.toString(enc);
			file.mdfile = MdFile.create(content);
		}
		this.push(file);
		callback();
	}); 
}

function layout(article: Article):string {
	const layout = React.createElement(Layout, {article: article});
	return RDS.renderToString(layout);
}

function createIndexPath(filePath: string) {
	const p = path.parse(filePath);
	if (p.name !== 'index') {
		return path.join(p.dir, p.name, 'index.html')
	}
	return path.join(p.dir, 'index.html');
}

export function toArticle () {
	return through.obj(function (file, enc, callback) {
		const mdfile = file.mdfile;
		if (mdfile) {
			const article = new Article(mdfile);
			file.contents = new Buffer(layout(article), enc);
			file.path = createIndexPath(file.path);
		}
		this.push(file);
		callback();
	});
}