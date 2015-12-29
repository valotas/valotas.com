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
