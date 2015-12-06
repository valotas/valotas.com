import {MdFile} from './MdFile';
import {Article} from './Article';

describe('Article', () => {
    it('Should be instanciacable with an MdFile',  () => {
        const article = new Article({
            title: 'md file',
            date: '2015-11-11',
            published: false,
            raw: 'some md content'
        });
        expect(article).not.toBeNull();
    })
});