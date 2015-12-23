import {MetaFile} from './MetaFile';

describe('MdFile', () => {
    
    var raw = `
---
title: Tomcat init.d script
author: valotas
date: 2011-05-14
template: article.jade
published: false
---

The actual content

`;
    
    it('should extract the yalm info a and raw',  () => {
        const file = MetaFile.create(raw);
        expect(file.title).toEqual('Tomcat init.d script');
        expect(file.date).toEqual('2011-05-14');
        expect(file.raw).toEqual('The actual content');
        expect(file.template).toEqual('article.jade');
        expect(file.published).toEqual(false);
    });
    
    it('should use null if a property has not been found',  () => {
        const file = MetaFile.create(`
---
title: Tomcat init.d script
date: 2011-05-14
---

The actual content

`);
        expect(file.title).toEqual('Tomcat init.d script');
        expect(file.date).toEqual('2011-05-14');
        expect(file.raw).toEqual('The actual content');
        expect(file.template).toBeFalsy();
    });
});