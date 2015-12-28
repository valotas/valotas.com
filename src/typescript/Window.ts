interface CreateScriptOptions {
	protocol?: string;
	id?: string;
}

class Win {
	
	constructor(public window: Window) {
		
	}
	
	addScript(url: string, options?: CreateScriptOptions) {
		const script = this.createScript(url, options);
		this.getBody().appendChild(script);
	}
	
	createScript(url: string, options?: CreateScriptOptions): HTMLScriptElement {
		const wf = this.window.document.createElement('script');
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
		return this.window.document.getElementsByTagName('body')[0];
	}
	
	query(selector: string) {
		return this.window.document.querySelector(selector);
	}
}

function createWindow() {
	return typeof window === 'undefined' ? null : new Win(window);
}

export const WIN = createWindow();