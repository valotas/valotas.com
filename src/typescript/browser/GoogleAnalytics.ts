import {BROWSER} from './Browser';

function noop () {

}

interface SendPageViewArgument {
    path: string;
    title: string;
}

class GoogleAnalytics {
    constructor(public ga, propertyId: string) {
        ga('create', propertyId, 'auto');
    }

    sendPageView(page?: SendPageViewArgument): GoogleAnalytics {
        if (page) {
            this.ga('set', {
                page: page.path,
                title: page.title
            });
        }
        this.ga('send', 'pageview');

        return this;
    }
}

export function createGoogleAnalytics(propertyId: string, win = BROWSER): GoogleAnalytics {
    if (!win) {
        return new GoogleAnalytics(noop, '');
    }

    const window = win.window;
    const name = 'ga';

    const ga = window[name];
    if (ga) {
        return ga;
    }

    window['GoogleAnalyticsObject'] = name;
    window[name] = window[name] || function() {
        (window[name].q = window[name].q || []).push(arguments);
    };
    window[name].l = 1 * new Date().getTime();

    win.addScript('//www.google-analytics.com/analytics.js');

    return new GoogleAnalytics(window[name], propertyId);
}