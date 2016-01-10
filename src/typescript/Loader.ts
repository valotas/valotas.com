import {WIN} from './Window';

interface TwttrWidgets {
	load();
}

interface Twttr {
	widgets: TwttrWidgets;
}

class TwitterThenable {
    init;
    loadedTwttr: Twttr

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
	
	constructor (private win = WIN) {
		
	}
	
	loadTwitter(): TwitterThenable {
		if (!this.twttr) {
			this.twttr = new TwitterThenable(this.win);
		
			//load the widgets.js
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
	
	// base on the code found at https://mjau-mjau.com/blog/ajax-universal-analytics/
	loadAnalytics() {
		let ga = this.win.prop('ga');
		if (ga) {
			return ga;
		}
		
		ga = this.win.prop('ga', function () {
			(ga.q=ga.q||[]).push(arguments)
		});
		ga.l=+new Date;
		this.win.addScript('//www.google-analytics.com/analytics.js');
		return ga;
	}
}

export const LOADER = new Loader();
