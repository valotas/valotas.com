interface GulpFile {
	meta: MetaFileData|MetaFileData[];
	html?: string;
	article?: Article;
	contents?: any;
	path: string;
	base: string;
}