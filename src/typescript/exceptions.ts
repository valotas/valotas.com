

export function illegalFromatException(message: string) {
	return new IllegalFromatException(message);
} 

export class IllegalFromatException implements Error {
	public name = 'IllegalFromatException';
	
	constructor (public message: string){

    }
}
