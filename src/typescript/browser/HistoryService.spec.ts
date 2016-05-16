import {HistoryService} from './HistoryService';

describe('HistoryService', () => {
	let win;
	let history: HistoryService;

	beforeEach(() => {
        win = {
			addEventListener: (name: string, listener: (ev: PopStateEvent) => void) => {
				win[name] = listener;
			}
		} as Window;
		history = new HistoryService(win);
	});

	it('should register an onpopstate listener', () => {
		expect(win.popstate).toBeDefined();
	});

	describe('onPopState', () => {
		it('should register popstate listeners', () => {
			const listener = jasmine.createSpy('popStateListener');
			const registration = history.onPopState(listener);
			const event = {
				state: {} as PageState
			};
			win.popstate(event);
			expect(listener).toHaveBeenCalledWith(event.state);
		});
	});

	describe('pushState', () => {
		it('should call win.history.pushState', () => {
			win.history = jasmine.createSpyObj('history', ['pushState']);
			const state = {
				meta: [],
				title: 'the title',
				path: 'the path'
			};
			history.pushState(state);
			expect(win.history.pushState).toHaveBeenCalledWith(state, state.title, state.path);
		});

		it('should call notify registered listeners', () => {
			win.history = jasmine.createSpyObj('history', ['pushState']);
			const state = {
				meta: [],
				title: 'the title',
				path: 'the path'
			};
			const listener = jasmine.createSpy('listener');
			history.onPushState(listener);
			history.pushState(state);
			expect(listener).toHaveBeenCalledWith(state);
		});
	});
});
