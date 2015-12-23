import {MetaFile} from './MetaFile';

export class MetaFileService {
	constructor(private fetcher: Window) {
		
	}
	
	load(key: string) {
		return fetch(`/{key}`)
			.then((body) => {
				return body.json();
			})
			.then((json) => {
				const meta = json as MetaFile;
				return new MetaFile(meta);
			});	
	}
}