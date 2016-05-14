import {VALOTAS, isArray} from './utils';
import {createTitle} from './titleFactory';

class PageStateImpl implements PageState {
	public title: string;
	public path: string;

	constructor (public meta: MetaFileData|MetaFileData[]) {
		this.title = createTitle(meta);
		this.path = createPath(meta);
	}
}

function createPath(meta: MetaFileData|MetaFileData[]) {
	if (!isArray(meta)) {
		return `/${meta.path}/`;
	}
	return '/';
}

export function createPageState(meta: MetaFileData|MetaFileData[]): PageState {
	return new PageStateImpl(meta);
}