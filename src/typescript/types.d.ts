declare module 'base64-js' {
	export function toByteArray(input: string): number[];
	export function fromByteArray(bytes: number[]): string; 
}