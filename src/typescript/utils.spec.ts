import {escapeTags, unEscapeTags} from './utils';

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
});