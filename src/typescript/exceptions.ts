
export function illegalArgumentException(message: string) {
	return new IllegalArgumentException(message);
} 


class IllegalArgumentException implements Error {
	public name = 'IllegalArgumentException';
	
	constructor (public message: string){

    }
}


export function illegalFromatException(message: string) {
	return new IllegalFromatException(message);
} 

export class IllegalFromatException implements Error {
	public name = 'IllegalFromatException';
	
	constructor (public message: string){

    }
}
