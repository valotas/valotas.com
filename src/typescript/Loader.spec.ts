import {Loader} from './Loader';

describe('Loader', () => {
	const win = {
		window: {} as Window,
		addScriptCallCount: 0,
		addScript: () => {
			win.addScriptCallCount++; 
		},
		createScript: () => null,
		getBody: () => null,
		query: () => null,
		doc: {},
		pushState: (statedata: any, title?: string, url?: string) => null,
		scrollToTop: () => null
	};
	let loader;
	
	beforeEach(() => {
		loader = new Loader(win);
	});
	
	describe('loadTwitter()', () => {
		it('should return a promise', () => {
			const actual = loader.loadTwitter();
			expect(actual instanceof Promise).toBe(true);
		});
		
		it('should add the twttr attribute in to the window object', () => {
			const actual = loader.loadTwitter();
			expect(win.window['twttr']).toBeDefined();
		});
		
		it('should add the widget script', () => {
			spyOn(win, 'addScript').and.callThrough();
			loader.loadTwitter();
			expect(win.addScript).toHaveBeenCalledWith('//platform.twitter.com/widgets.js', {
				id: 'twitter-wjs',
				protocol: 'https'
			});
		});
		
		it('should not try to add the script twice', () => {
			const initialCallCount = win.addScriptCallCount;
			spyOn(win, 'addScript').and.callThrough();
			loader.loadTwitter();
			loader.loadTwitter();
			loader.loadTwitter();
			expect(win.addScriptCallCount).toEqual(initialCallCount + 1);
		});
	});
});
