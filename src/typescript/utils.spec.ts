import {inflate,  deflate} from './utils';

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