import {createScript} from './utils';

export function loadWebfonts(win: Window) {
	win['WebFontConfig'] = {
		google: { families: [ 'Gloria+Hallelujah::latin', 'Open+Sans::latin,greek' ] }
	};
    
	const wf = createScript('//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js');
    win.document.getElementsByTagName('body')[0]
		.appendChild(wf);
}