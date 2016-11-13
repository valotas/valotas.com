declare module 'base64-js' {
	export function toByteArray(input: string): number[];
	export function fromByteArray(bytes: number[]): string;
}

type Fetch = (url: RequestInfo, init?: RequestInit) => Promise<Response>;

declare module 'node-fetch' {
	const fetch: Fetch;
	export default fetch;
}

interface Fetcher {
	fetch: Fetch;
}

interface PageState {
	meta: MetaFileData|MetaFileData[];
	title: string;
	path: string;
}

interface PackageJson {
	version: string;
	name: string;
}