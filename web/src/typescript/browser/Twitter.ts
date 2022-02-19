import { BROWSER } from "./Browser";

const TWITTER_SCRIPT_ID = "twitter-wjs";
const TWTTR = "twttr";

interface TwttrWidgets {
  load();
}

interface Twttr {
  widgets: TwttrWidgets;
}

class TwitterThenable {
  then(f: (t: Twttr) => void) {
    const twttr = window[TWTTR];
    if (twttr.widget) {
      f(twttr as Twttr);
    } else {
      twttr.ready(() => {
        f(window[TWTTR] as Twttr);
      });
    }
  }
}

export function loadTwitter(browser = BROWSER) {
  const { window } = browser;

  const loaded = window[TWTTR];
  if (!loaded) {
    window[TWTTR] = createTwttr(window);

    // load the widgets.js
    browser.addScript("//platform.twitter.com/widgets.js", {
      id: TWITTER_SCRIPT_ID,
      protocol: "https",
    });
  }
  return new TwitterThenable();
}

function createTwttr(window) {
  const t = window[TWTTR] || { _e: [] };
  t.ready = function (f) {
    t._e.push(f);
  };
  return t;
}
