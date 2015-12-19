import {MdFile} from './MdFile';
import {Article} from './Article';

describe('Article', () => {
    it('Should be instanciacable with an MdFile',  () => {
        const article = new Article({
            title: 'md file',
            date: '2015-11-11',
            published: false,
            raw: 'some md content',
            template: null,
            path: null
        });
        expect(article).not.toBeNull();
    });

    describe('date()',() => {
        it('should be able to parse and return the given date', () => {
            const article = new Article({
                title: 'md file',
                date: '2015-11-12',
                published: false,
                raw: 'some md content',
                template: null,
                path: null
            });
            expect(article.date()).toEqual('12/11/2015');
        });

        it('should be able return the date in a specific format', () => {
            const article = new Article({
                title: 'md file',
                date: '2015-11-12',
                published: false,
                raw: 'some md content',
                template: null,
                path: null
            });
            expect(article.date('YYYY.DD.MM')).toEqual('2015.12.11');
        });
    });

    describe('html()', () => {
        it('should be able to return the given raw in html', () => {
            const html = new Article({
                title: 'md file',
                date: '2015-11-12',
                published: false,
                raw: '# this is big\n##  this smaller',
                template: null,
                path: null
            }).html();

            expect(html).toContain('>this is big</h1>');
            expect(html).toContain('>this smaller</h2>');
        });
        
        it('should replace the first letter with a span', () => {
            const html = new Article({
                title: 'md file',
                date: '2015-11-12',
                published: false,
                raw: 'this is the very first paragraph',
                template: null,
                path: null
            }).html();
            expect(html).toContain('<p><span class="first-letter">t</span>his is');
        });
    });
    
    describe('description()', () => {
       it('should return the very first paragraph', () => {
           const description = new Article({
                title: 'md file',
                date: '2015-11-12',
                published: false,
                raw: 'this is the very first paragraph\n\n## h1\nanother paragraph',
                template: null,
                path: null
            }).description();
            expect(description).toEqual('<p><span class="first-letter">t</span>his is the very first paragraph</p>\n');
       });
    });
});