import {Loader} from './Loader';

describe('Loader', () => {
	let win;
	let loader;
	
	beforeEach(() => {
        win = {
            addScriptCallCount: 0,
            addScript: () => {
                win.addScriptCallCount++; 
            },
            createScript: () => null,
            getBody: () => null,
            query: () => null,
            doc: {} as Document,
            pushState: (statedata: any, title?: string, url?: string) => null,
            scrollToTop: () => null,
            ready: () => null,
            on: (name: string, f) => null,
            fetch: (url: string) => null,
            browserSupported: true,
            prop: (name, initialValue?) => {
                const actualName = `__${name}`;
                if (initialValue) {
                    win[actualName] = win[actualName] || initialValue;   
                }
                return win[actualName];
            }
        };
		loader = new Loader(win);
	});
	
	describe('loadTwitter()', () => {
		it('should return a thenable', () => {
			const actual = loader.loadTwitter();
			expect(actual.then).toBeDefined();
		});
		
		it('should add the twttr attribute in to the window object', () => {
			loader.loadTwitter();
            expect(win['__twttr']).toBeDefined();
		});
        
        it('should add the functions added with then to the queque', () => {
            const then1 = jasmine.createSpy('then1');
            const then2 = jasmine.createSpy('then2');
			
            const actual = loader.loadTwitter();
            actual.then(then1);
            actual.then(then2);
            
            expect(actual.init._e).toContain(then1);
            expect(actual.init._e).toContain(then2);
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
