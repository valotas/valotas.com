
interface Article {
    title: string;
    key: string;
    meta: MetaFileData;
    moment(): moment.Moment;
    date(format?: string): string;
    description(): string;
    hasTweets(): boolean;
}

interface MetaFileData {
    title: string;
    path: string;
    date: string;
    published?: boolean;
    raw?: string;
    description?: string;
    template?: string;
	gists?: GistContent[];
    error?: any;
}

interface GistDescription {
	gistId: string;
	file: string;
	user?: string;
}

interface GistContent extends GistDescription {
	content?: string;
}
