import {WIN} from './Window';

interface TwttrWidgets {
	load();
}

interface Twttr {
	widgets: TwttrWidgets;
}

export class Loader {
	private twttrPromise;
	
	constructor (private win = WIN) {
		
	}
	
	loadTwitter(): Promise<Twttr> {
		if (!this.twttrPromise) {
			const win = this.win.window;
			this.twttrPromise = new Promise(function (resolve) {
				const twttr = win['twttr'] = win['twttr'] || { _e: [] };
				twttr._e.push(() => {
					console.log(twttr);
					resolve(twttr);
				});
			});
		
			//load the widgets.js
			this.win.addScript('//platform.twitter.com/widgets.js', {
				id: 'twitter-wjs',
				protocol: 'https'
			});
		}
		return this.twttrPromise;
	}
	
	loadWebFonts(families: string[] = [ 'Gloria+Hallelujah::latin', 'Open+Sans::latin,greek' ]) {
		this.win.window['WebFontConfig'] = {
			google: { families:  families}
		};
		this.win.addScript('//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js');
	}
	
	// base on the code found at https://mjau-mjau.com/blog/ajax-universal-analytics/
	loadAnalytics() {
		const window = this.win.window;
		if (window['ga']) {
			return window['ga'];
		}
		
		const ga = window['ga'] = window['ga'] || function () {
			(ga.q=ga.q||[]).push(arguments)
		};
		ga.l=+new Date;
		this.win.addScript('//www.google-analytics.com/analytics.js');
		return ga;
	}
}

export const LOADER = new Loader();