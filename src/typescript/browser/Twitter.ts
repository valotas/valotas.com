import {BROWSER} from './Browser';

const TWITTER_SCRIPT_ID = 'twitter-wjs';

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

export function loadTwitter(win = BROWSER) {
	const loaded = win.prop('twttr');
	if (!loaded) {
		// load the widgets.js
		win.addScript('//platform.twitter.com/widgets.js', {
			id: TWITTER_SCRIPT_ID,
			protocol: 'https'
		});
	}
	return new TwitterThenable(win);
}
