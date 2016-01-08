interface CreateScriptOptions {
	protocol?: string;
	id?: string;
}

class Win {
	doc: Document;
    browserSupported: boolean;
	
	constructor(public window: Window) {
		this.doc = window.document;
        this.browserSupported = window['fetch'] && window['Promise'];
	}
	
	addScript(url: string, options?: CreateScriptOptions) {
		const script = this.createScript(url, options);
		this.getBody().appendChild(script);
	}
	
	createScript(url: string, options?: CreateScriptOptions): HTMLScriptElement {
		const wf = this.doc.createElement('script');
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
		return this.doc.getElementsByTagName('body')[0];
	}
	
	query(selector: string) {
		return this.doc.querySelector(selector);
	}
	
	pushState(statedata: any, title?: string, url?: string) {
		this.window.history.pushState(statedata, title, url);
	}
	
	scrollToTop() {
		this.window.scrollTo(0, 0);
	}
	
	ready(ondocumentReady) {
		if (this.doc.readyState === 'complete') {
			ondocumentReady();
		} else {
			this.doc.addEventListener('DOMContentLoaded', ondocumentReady, false);
		}
	}
   
    on(name: string, f) {
        this.window['on' + name] = f;
    }
    
    fetch(url: string) {
        return this.window.fetch(url);
    }
}

function createWindow() {
	return typeof window === 'undefined' ? null : new Win(window);
}

export const WIN = createWindow();