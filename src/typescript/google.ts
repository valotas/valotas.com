
export function loadWebfonts() {
	window['WebFontConfig'] = {
		google: { families: [ 'Gloria+Hallelujah::latin', 'Open+Sans::latin,greek' ] }
	};
    
	const wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = true;
    document.getElementsByTagName('body')[0]
		.appendChild(wf);
}