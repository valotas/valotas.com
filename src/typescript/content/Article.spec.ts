import {MetaFile} from './MetaFile';
import {createArticle as createArticleFromMetaFile} from './Article';

function createArticle(input: any) {
    return createArticleFromMetaFile(new MetaFile(input));
}

describe('Article', () => {
    it('Should be instanciacable with an MdFile',  () => {
        const article = createArticle({
            title: 'md file',
            date: '2015-11-11',
            published: false,
            raw: 'some md content',
            template: null,
            path: null,
            description: null
        });
        expect(article).not.toBeNull();
    });

    describe('date()', () => {
        it('should be able to parse and return the given date', () => {
            const article = createArticle({
                title: 'md file',
                date: '2015-11-12',
                published: false,
                raw: 'some md content',
                template: null,
                path: null,
                description: null
            });
            expect(article.date()).toEqual('12/11/2015');
        });

        it('should be able return the date in a specific format', () => {
            const article = createArticle({
                title: 'md file',
                date: '2015-11-12',
                published: false,
                raw: 'some md content',
                template: null,
                path: null,
                description: null
            });
            expect(article.date('YYYY.DD.MM')).toEqual('2015.12.11');
        });
    });

    describe('description()', () => {
       it('should return the description as is when provided', () => {
           const description = createArticle({
                title: 'md file',
                date: '2015-11-12',
                published: false,
                raw: 'this is the very first paragraph\n\n## h1\nanother paragraph',
                template: null,
                path: null,
                description: 'this is a description'
            }).description();
            expect(description).toEqual('this is a description');
       });

       it('should compute the description from the given raw', () => {
           const description = createArticle({
                title: 'md file',
                date: '2015-11-12',
                published: false,
                raw: 'this is the very first paragraph\n\n## h1\nanother paragraph',
                template: null,
                path: null,
                description: null
            }).description();
            expect(description).toEqual('this is the very first paragraph');
       });

       it('should not break on simple #', () => {
           const description = createArticle({
                title: 'md file',
                date: '2015-11-12',
                published: false,
                raw: 'paragraph with c#\n\n## h1\nanother paragraph',
                template: null,
                path: null,
                description: null
            }).description();
            expect(description).toEqual('paragraph with c#');
       });
    });

    describe('hasTweets()', () => {
        it('should return true if the raw contains "twitter-tweet"', () => {
           const article = createArticle({
                title: 'md file',
                date: '2015-11-12',
                published: false,
                raw: 'this is the very first something containing "twitter-tweet"',
                template: null,
                path: null,
                description: 'this is a description'
            });
            expect(article.hasTweets()).toEqual(true);
       });
    });
});