import {MetaFile} from './MetaFile';
import {ArticleDescription} from './ArticleDescription';
import * as ex from '../exceptions';

interface Fetcher {
	fetch: (url: string|Request, init?: RequestInit) => Promise<Response>
}

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
	
	load(input: string) {
		const url = this._createUrl(input);
		return this._loadMetaFile(url)
			.then((meta) => {
				this.listeners.forEach((listener) => {
					listener(meta);
				});
				return meta;
			});
	}
	
	_createUrl(input:string|ArticleDescription) {
		if (isString(input)) {
			let url = input as string;
			if (url.indexOf('/') !== 0) {
				url = '/' + url;
			}
			if (url.lastIndexOf('/') < url.length) {
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
			.then((body) => {
				return body.json();
			})
			.then((json) => {
				const meta = json as MetaFile;
				return new MetaFile(meta);
			});
	}
	
	onChange(listener: (meta: MetaFile) => void) {
		this.listeners.push(listener);
		return () => {
			const index = this.listeners.indexOf(listener);
			this.listeners.splice(index, 1);
		};
	}
}