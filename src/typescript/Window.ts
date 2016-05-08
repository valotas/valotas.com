interface CreateScriptOptions {
	protocol?: string;
	id?: string;
}

class Win {
	browserSupported: boolean;
	
	constructor() {
        this.browserSupported = window['fetch'] && window['Promise'];
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
	
	pushState(statedata: any, title?: string, url?: string) {
		window.history.pushState(statedata, title, url);
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

function createWindow() {
	return typeof window === 'undefined' ? null : new Win();
}

export const WIN = createWindow();