declare module 'base64-js' {
	export function toByteArray(input: string): number[];
	export function fromByteArray(bytes: number[]): string; 
}

interface Fetcher {
	fetch: (url: string|Request, init?: RequestInit) => Promise<Response>
}
