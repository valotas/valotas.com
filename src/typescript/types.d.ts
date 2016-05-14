declare module 'base64-js' {
	export function toByteArray(input: string): number[];
	export function fromByteArray(bytes: number[]): string;
}

declare module 'node-fetch' {
	const fetcher: Fetcher;
	export = fetcher.fetch;
}

interface Fetcher {
	fetch: (url: string|Request, init?: RequestInit) => Promise<Response>;
}

interface GistDescription {
	gistId: string;
	file: string;
	user?: string;
}

interface GistContent extends GistDescription {
	content?: string;
}

interface MetaFileData {
    title: string;
    path: string;
    date: string;
    published?: boolean;
    raw?: string;
    description?: string;
    template?: string;
	gists?: GistContent[];
}

interface PageState {
	meta: MetaFileData|MetaFileData[];
	title: string;
	path: string;
}
