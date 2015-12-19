const DASHES = /\n?---/;
const KV_SPLIT = /\n|\:/

function findValue(pairs, key) {
    for (var i = 0; i < pairs.length; i++) {
        if (key === pairs[i]) {
            return pairs[i + 1].trim();
        }
    }
}

export class MdFile {
    title: string;
    path: string;
    date: string;
    published: boolean = true;
    raw: string;
    template: string;
    
    static create(raw: string, path?: string): MdFile {
        let file = new MdFile();
        const matches = raw.split(DASHES);
        file.raw = matches[2].trim();
        
        const pairs = matches[1].trim().split(KV_SPLIT); 
        file.title = findValue(pairs, 'title');
        file.date = findValue(pairs, 'date');
        file.template = findValue(pairs, 'template');
        file.path = path;
        return file;
    }
}