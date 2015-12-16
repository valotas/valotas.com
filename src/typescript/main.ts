import * as React from 'react';
import * as ReactDom from 'react-dom';
import {Article} from './content/Article';
import {MdFile} from './content/MdFile';
import {Layout} from './react/Layout';

const mdfile = MdFile.create(`
---
title: Tomcat init.d script
author: valotas
date: 2011-05-14
template: article.jade
---

The actual content

`);
const article = new Article(mdfile);

ReactDom.render(React.createElement(Layout, {article: article}), document.body);