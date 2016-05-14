import {BROWSER} from './browser/Browser';

interface TwttrWidgets {
	load();
}

interface Twttr {
	widgets: TwttrWidgets;
}

class TwitterThenable {
    init;
    loadedTwttr: Twttr;

    constructor(win) {
        this.init = win.prop('twttr', { _e: [] });
        this.init._e.push(() => {
           this.loadedTwttr = win.prop('twttr');
        });
    }

    then(f) {
        if (this.loadedTwttr) {
            f(this.loadedTwttr);
        } else {
            this.init._e.push(f);
        }
    }
}

export class Loader {
	private twttr;

	constructor (private win = BROWSER) {

	}

	loadTwitter(): TwitterThenable {
		if (!this.twttr) {
			this.twttr = new TwitterThenable(this.win);

			// load the widgets.js
			this.win.addScript('//platform.twitter.com/widgets.js', {
				id: 'twitter-wjs',
				protocol: 'https'
			});
		}
		return this.twttr;
	}

	loadWebFonts(families: string[] = [ 'Gloria+Hallelujah::latin', 'Open+Sans::latin,greek' ]) {
		this.win.prop('WebFontConfig', {
			google: { families:  families}
		});
		this.win.addScript('//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js');
	}
}

export const LOADER = new Loader();
