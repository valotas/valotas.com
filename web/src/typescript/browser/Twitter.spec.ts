import { loadTwitter } from './Twitter';

describe('Twitter', () => {
  let browser;

  beforeEach(() => {
    browser = {
      window: {},
      addScriptCallCount: 0,
      addScript: () => {
        browser.addScriptCallCount++;
      }
    };
  });

  describe('loadTwitter()', () => {
    it('should return a thenable', () => {
      const actual = loadTwitter(browser);
      expect(actual.then).toBeDefined();
    });

    it('should add the twttr attribute in to the window object', () => {
      loadTwitter(browser);
      expect(browser.window['twttr']).toBeDefined();
    });

    it('should add the widget script', () => {
      spyOn(browser, 'addScript').and.callThrough();
      loadTwitter(browser);
      expect(browser.addScript).toHaveBeenCalledWith(
        '//platform.twitter.com/widgets.js',
        {
          id: 'twitter-wjs',
          protocol: 'https'
        }
      );
    });

    it('should not try to add the script twice', () => {
      const initialCallCount = browser.addScriptCallCount;
      spyOn(browser, 'addScript').and.callThrough();
      loadTwitter(browser);
      loadTwitter(browser);
      loadTwitter(browser);
      expect(browser.addScriptCallCount).toEqual(initialCallCount + 1);
    });
  });
});
