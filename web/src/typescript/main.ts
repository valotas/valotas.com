/* eslint-disable no-console */

import { render, h } from 'preact';
import { Fetcher, MetaFileData } from './types';
import { PackageJson } from './PackageJson';
import { MetaFile, isValidMetaFile } from './content/MetaFile';
import { MetaFileStore } from './content/MetaFileStore';
import { Page, PageProps } from './react/Page';
import { inflate } from './utils';
import { BROWSER } from './browser/Browser';
import { loadWebFonts } from './browser/loadWebFonts';
import { GistStore } from './content/GistStore';
import { FetchStreamer } from './FetchStreamer';
import { createGoogleAnalytics } from './browser/GoogleAnalytics';
import { createPageState, PageState } from './PageState';

console.time('load');

BROWSER.history.onPopState(setCurrentTitle);
BROWSER.history.onPushState(setCurrentTitle);

function setCurrentTitle(state: PageState) {
  const newTitle = state ? state.title : BROWSER.initialTitle;
  BROWSER.title(newTitle);
}

BROWSER.ready(() => {
  loadWebFonts();

  // Create the main store and register the state to the history object
  const ga = createGoogleAnalytics('UA-12048148-1').sendPageView();
  const sendPageView = ga.sendPageView.bind(ga);
  BROWSER.history.onPopState(sendPageView);
  BROWSER.history.onPushState(sendPageView);

  const fetcher = new FetchStreamer(BROWSER);
  const metafileStore = createMetafileStore(fetcher);

  const metaHolder = BROWSER.query(
    'script[type="application/json"]'
  ) as HTMLElement;
  const metadata = inflate(metaHolder.innerHTML) as
    | MetaFileData
    | MetaFileData[];
  const meta = MetaFile.fromData(metadata);
  console.debug('Infalted meta', meta);

  // Render the main react component
  const pageProps: PageProps = {
    meta,
    metafileStore,
    fetcher,
    gistStore: new GistStore(
      fetcher,
      metafileStore,
      isValidMetaFile(meta) ? meta : null
    ),
    pkg: BROWSER.prop('pkg') as PackageJson
  };
  const el = h(Page, pageProps);
  const root = BROWSER.query('#app');
  render(el, root, root.firstElementChild);
});

function createMetafileStore(fetcher: Fetcher) {
  const metafileStore = new MetaFileStore(fetcher);
  metafileStore.onChange(meta => {
    const state = createPageState(meta);
    BROWSER.history.pushState(state);
    BROWSER.scrollToTop();
  });
  return metafileStore;
}
