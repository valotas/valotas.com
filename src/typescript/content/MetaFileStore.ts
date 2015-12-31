import {MetaFile, isValidMetaFile} from './MetaFile';
import {ArticleDescription} from './ArticleDescription';
import * as ex from '../exceptions';

function isString(input:any): input is string {
	return typeof input === 'string';
}

function isArticle(input:any): input is ArticleDescription {
	return input.key;
} 

export class MetaFileStore {
	private listeners: Function[] = [];
	
	constructor(private fetcher: Fetcher) {

	}
	
	load(input: string|ArticleDescription) {
		const url = this._createUrl(input);
		return this._loadMetaFile(url)
			.then((meta) => {
				this.listeners.forEach((listener) => listener(meta));
				return meta;
			});
	}
	
	_createUrl(input:string|ArticleDescription) {
		if (isString(input)) {
			let url = input as string;
			if (url.indexOf('/') !== 0) {
				url = '/' + url;
			}
			if (url.lastIndexOf('/') < url.length - 1) {
				url += '/';
			}
			return url + 'meta.json';
		}
		if (isArticle(input)) {
			return '/' + input.key + '/meta.json';	
		}
		throw ex.illegalFromatException('Can not create a url from given input: ' + input);
	}
	
	_loadMetaFile(url: string) {
		return this.fetcher
			.fetch(url)
			.then((body) => body.json())
			.then((json) => MetaFile.fromData(json as MetaFileData|MetaFileData[]));
	}
	
	onChange(listener: (meta: MetaFile|MetaFile[]) => void) {
		this.listeners.push(listener);
		return () => {
			const index = this.listeners.indexOf(listener);
			this.listeners.splice(index, 1);
		};
	}
}