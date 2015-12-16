import {MdFile} from './MdFile';

describe('MdFile', () => {
    
    var raw = `
---
title: Tomcat init.d script
author: valotas
date: 2011-05-14
template: article.jade
---

The actual content

`;
    
    it('should extract the yalm info a and raw',  () => {
        const file = MdFile.create(raw);
        expect(file.title).toEqual('Tomcat init.d script');
        expect(file.date).toEqual('2011-05-14');
        expect(file.raw).toEqual('The actual content');
    });
});