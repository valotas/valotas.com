interface CreateScriptOptions {
	protocol?: string;
	id?: string;
}

class Browser {
	public browserSupported: boolean;
	public window: Window;
	
	constructor() {
        this.browserSupported = window['fetch'] && window['Promise'];
		this.window = window;
	}
	
	addScript(url: string, options?: CreateScriptOptions) {
		const script = this.createScript(url, options);
		this.getBody().appendChild(script);
	}
	
	createScript(url: string, options?: CreateScriptOptions): HTMLScriptElement {
		const wf = window.document.createElement('script');
		const proto = options && options.protocol ? options.protocol : 'https:' == document.location.protocol ? 'https' : 'http';
		wf.src = proto + ':' + url;
		wf.type = 'text/javascript';
		wf.async = true;
		if (options && options.id) {
			wf.id = options.id
		}
		return wf;
	}
	
	getBody() {
		return window.document.getElementsByTagName('body')[0];
	}
	
	query(selector: string) {
		return window.document.querySelector(selector);
	}
	
	pushState(page: PageState) {
		window.history.pushState(page, page.title, page.path);
		this.title(page.title);
	}
	
	scrollToTop() {
		window.scrollTo(0, 0);
	}
	
	ready(ondocumentReady) {
		if (window.document.readyState === 'complete') {
			ondocumentReady();
		} else {
			window.document.addEventListener('DOMContentLoaded', ondocumentReady, false);
		}
	}
   
   	onPopstate(f: (state: PageState) => void) {
		this.on('popstate', (ev: PopStateEvent) => {
			const page = ev.state as PageState;
			f(page);
		});
	}
    
	on(name: string, f) {
        window['on' + name] = f;
    }
    
    fetch(url: string) {
        return window.fetch(url);
    }
    
    prop(name: string, initialValue?) {
        if (initialValue) {
            window[name] = window[name] || initialValue;   
        }
        return window[name]; 
    }
	
	title (title: string) {
		window.document.title = title;
	}
}

function createBrowser() {
	return typeof window === 'undefined' ? null : new Browser();
}

export const BROWSER = createBrowser();