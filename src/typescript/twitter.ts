import {createScript} from './utils';

interface TwttrWidgets {
	load();
}

interface Twttr {
	widgets: TwttrWidgets;
}

let twttrPromise: Promise<Twttr>; 

export function loadTwitter(win: Window): Promise<Twttr> {
	if (!twttrPromise) {
		twttrPromise = new Promise(function (resolve) {
			const twttr = window['twttr'] = window['twttr'] || { _e: [] };
			twttr._e.push(() => {
				console.log(twttr);
				resolve(twttr);
			});
		});
	
		//load the widgets.js
		document.getElementsByTagName('body')[0]
			.appendChild(createScript('//platform.twitter.com/widgets.js', {
				id: 'twitter-wjs',
				protocol: 'https'
			}));
	
	}
	return twttrPromise;
}
