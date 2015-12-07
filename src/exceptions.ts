
export class IllegalFromatException implements Error {
	public name = 'IllegalFromatException';
	
	constructor (public message: string){

    }
}
