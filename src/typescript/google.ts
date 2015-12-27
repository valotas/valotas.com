import {createScript} from './utils';

export function loadWebfonts() {
	window['WebFontConfig'] = {
		google: { families: [ 'Gloria+Hallelujah::latin', 'Open+Sans::latin,greek' ] }
	};
    
	const wf = createScript('//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js');
    document.getElementsByTagName('body')[0]
		.appendChild(wf);
}