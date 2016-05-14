import * as React from 'react';
import * as ReactDom from 'react-dom';
import {MetaFile, isValidMetaFile} from './content/MetaFile';
import {MetaFileStore} from './content/MetaFileStore';
import {Layout} from './react/Layout';
import {inflate} from './utils';
import {BROWSER} from './browser/Browser';
import {LOADER} from './Loader';
import {GistStore} from './content/GistStore';
import {FetchStreamer} from './FetchStreamer';
import {createGoogleAnalytics} from './browser/GoogleAnalytics';
import {createPageState} from './PageState';

console.time('load');

BROWSER.ready(() => {
	LOADER.loadWebFonts();

	// Create the main store and register the state to the history object
	const fetcher = new FetchStreamer(BROWSER);
	const ga = createGoogleAnalytics('UA-12048148-1').sendPageView();
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
		gistStore: new GistStore(fetcher, metafileStore, isValidMetaFile(meta) ? meta : null)
	});
	ReactDom.render(el, BROWSER.query('#app'), () => {
		console.timeEnd('load');
	});
});

function createMetafileStore(ga: {sendPageView: (PageState) => any}, fetcher: Fetcher) {
    const metafileStore = new MetaFileStore(fetcher);
	metafileStore.onChange((meta) => {
		const state = createPageState(meta);
		BROWSER.pushState(state);
		ga.sendPageView(state);
		BROWSER.scrollToTop();
	});
    return metafileStore;
}