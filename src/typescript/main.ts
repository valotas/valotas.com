import * as React from 'react';
import * as ReactDom from 'react-dom';
import {MetaFile, isValidMetaFile} from './content/MetaFile';
import {MetaFileStore} from './content/MetaFileStore';
import {Layout} from './react/Layout';
import {inflate, VALOTAS} from './utils';
import {WIN} from './Window';
import {LOADER} from './Loader';
import {GistStore} from './content/GistStore';

console.time('load');

WIN.ready(() => {
	LOADER.loadWebFonts();

	const ga = LOADER.loadAnalytics();
	ga('create', 'UA-12048148-1', 'valotas.com');
	ga('send', 'pageview');
	
	// Create the main store and register the state to the history object
	const metafileStore = new MetaFileStore(window);
	metafileStore.onChange((meta) => {
		if (isValidMetaFile(meta)) {
			WIN.pushState(meta, meta.title, '/' + meta.path + '/');
		} else {
			WIN.pushState(meta, VALOTAS, '/');
		}
		ga('send', 'pageview');
		WIN.scrollToTop();
	});
	
	console.time('react-load');
	const metaHolder = WIN.query('script[type="application/json"]') as HTMLElement;
	const metadata = inflate(metaHolder.innerHTML) as MetaFileData|MetaFileData[];
	const meta = MetaFile.fromData(metadata);
	console.debug('Infalted meta', meta);
	
	// Render the main react component
	const el = React.createElement(Layout, {
		meta: meta,
		metafileStore: metafileStore,
		win: window,
		fetcher: window,
		gistStore: new GistStore(window, metafileStore, isValidMetaFile(meta) ? meta: null)
	});
	ReactDom.render(el, WIN.query('#app'), () => {
		console.timeEnd('load');
		console.timeEnd('react-load');
	});
});