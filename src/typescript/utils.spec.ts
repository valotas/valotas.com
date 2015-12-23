import {escapeTags, unEscapeTags, inflate,  deflate} from './utils';


describe('escapeTags', () => {	
	it('should replace all <tag> with [[[tag]]]', () => {
		const html = `
			<div>
				some simple <b>tag</b>
				within html <i>tags</i>
			</div>
		`;
		const actual = escapeTags(html);
		expect(actual).toEqual(`
			[[[div]]]
				some simple [[[b]]]tag[[[/b]]]
				within html [[[i]]]tags[[[/i]]]
			[[[/div]]]
		`);		
	});
	
	it('should return the input as is if it is falsey', () => {
		const actual = escapeTags(null);
		expect(actual).toBeFalsy();
	});
});


describe('unEscapeTags', () => {	
	it('should replace all [[[tag]]] with <tag>', () => {
		const html = `
			[[[div]]]
				some simple [[[b]]]tag[[[/b]]]
				within html [[[i]]]tags[[[/i]]]
			[[[/div]]]
		`;
		const actual = unEscapeTags(html);
		expect(actual).toEqual(`
			<div>
				some simple <b>tag</b>
				within html <i>tags</i>
			</div>
		`);		
	});
	
	it('should return the input as is if it is falsey', () => {
		const actual = unEscapeTags(null);
		expect(actual).toBeFalsy();
	});	
});

describe('deflate/infalte', () => {
	const obj = {
		param1: 'val1',
		param2: {
			param21: 'val21',
			param22: 'val22'
		}
	};
	
	it('should be able to inflate a given object and deflate it back', () => {
		const binary = deflate(obj);
		expect(binary).toBeTruthy();
		const restored = inflate(binary);
		expect(restored).toEqual(obj);
	});
});