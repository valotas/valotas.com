import {createGoogleAnalytics} from './GoogleAnalytics';

describe('GoogleAnalytics', () => {
	let win;

	beforeEach(() => {
        win = {
			window: {},
			addScript: function () {}
		};
	});

	describe('createGoogleAnalytics()', () => {
		it('should return an object even with a null window object', () => {
			const actual = createGoogleAnalytics('xxx', null);
			expect(actual).toBeDefined();
		});

		it('should add the ga object to the given window as property under the given name', () => {
			createGoogleAnalytics('xxx', win);
			expect(win.window.GoogleAnalyticsObject).toEqual('ga');
			expect(win.window.ga).toBeDefined();
		});

		it('should create a GoogleAnalytics object containing the create window.ga', () => {
			const actual = createGoogleAnalytics('xxx', win);
			expect(actual.ga).toEqual(win.window.ga);
		});

		it('should add the appropriate script using the given function', () => {
			win.addScript = jasmine.createSpy('addScript');
			createGoogleAnalytics('xxx', win);
			expect(win.addScript).toHaveBeenCalledWith('//www.google-analytics.com/analytics.js');
		});

		it('should not call addScript more than once', () => {
			win.addScript = jasmine.createSpy('addScript');
			createGoogleAnalytics('xxx', win);
			createGoogleAnalytics('xxx', win);
			createGoogleAnalytics('xxx', win);
			expect(win.addScript.calls.count()).toEqual(1);
		});
	});

	describe('sendPageView()', () => {
		let analytics;
		let ga;

		beforeEach(() => {
			analytics = createGoogleAnalytics(win);
			analytics.ga = ga = jasmine.createSpy('ga');
		});

		it('should call the underlying ga function and send a pageview', () => {
			analytics.sendPageView();
			expect(ga).toHaveBeenCalledWith('send', 'pageview');
		});

		it('should set the page with the given path and url before sending a page view when given', () => {
			const path = '/some/path';
			const title = 'some title';
			analytics.sendPageView({
				path: path,
				title: title
			});
			expect(ga).toHaveBeenCalledWith('set', {
				page: path,
				title: title
			});
			expect(ga).toHaveBeenCalledWith('send', 'pageview');
		});
	});
});
