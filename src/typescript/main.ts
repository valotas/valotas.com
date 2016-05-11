import * as React from 'react';
import * as ReactDom from 'react-dom';
import {MetaFile, isValidMetaFile} from './content/MetaFile';
import {MetaFileStore} from './content/MetaFileStore';
import {Layout} from './react/Layout';
import {inflate, VALOTAS} from './utils';
import {BROWSER} from './browser/Browser';
import {LOADER} from './Loader';
import {GistStore} from './content/GistStore';
import {FetchStreamer} from './FetchStreamer';
import {createGoogleAnalytics} from './browser/GoogleAnalytics';

console.time('load');

const ga = createGoogleAnalytics('UA-12048148-1').sendPageView();

BROWSER.ready(() => {
	LOADER.loadWebFonts();
	
	// Create the main store and register the state to the history object
	const fetcher = new FetchStreamer(BROWSER);
    const metafileStore = createMetafileStore(ga, fetcher);

	const metaHolder = BROWSER.query('script[type="application/json"]') as HTMLElement;
	const metadata = inflate(metaHolder.innerHTML) as MetaFileData|MetaFileData[];
	const meta = MetaFile.fromData(metadata);
	console.debug('Infalted meta', meta);
	
	// Render the main react component
	const el = React.createElement(Layout, {
		meta: meta,
		metafileStore: metafileStore,
		fetcher: fetcher,
		gistStore: new GistStore(fetcher, metafileStore, isValidMetaFile(meta) ? meta: null)
	});
	ReactDom.render(el, BROWSER.query('#app'), () => {
		console.timeEnd('load');
	});
});

function createMetafileStore(ga, fetcher: Fetcher) {
    const metafileStore = new MetaFileStore(fetcher);
	metafileStore.onChange((meta) => {
		let title = VALOTAS;
		let path = '/';
		if (isValidMetaFile(meta)) {
			title =  meta.title;
			path =  `/{meta.path}/`;
		}
		BROWSER.pushState(meta, title, path);
		ga.sendPageView(path, title);
		BROWSER.scrollToTop();
	});
    return metafileStore;
}