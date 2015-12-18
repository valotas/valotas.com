import * as React from 'react';
import * as ReactDom from 'react-dom';
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
ReactDom.render(React.createElement(Layout, {mdfile: mdfile}), document.body);