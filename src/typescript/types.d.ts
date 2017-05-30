declare module 'base64-js' {
  export function byteLength(encoded: string): number;
  // export function toByteArray(encoded: string): Uint8Array;
  export function fromByteArray(bytes: Uint8Array | number[]): string;
}
