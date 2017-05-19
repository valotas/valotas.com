---
title: Website revamp 2016
author: valotas
date: 2016-01-11
template: article.jade
---

A mixed combination of [react][reactjs] exploration, creativity and [assemble][assemble-io]'s inactivity, forced me to pop
the hood of this blog and make some serious changes that I am happy to share with you (not that you care that much, but
anyway)

[reactjs]: https://facebook.github.io/react/
[assemble-io]: http://assemble.io/

## Motivation

I felt inactive for quite some time now, so the idea came to update this site. Being a software engineer, I cared mostly
about the things under the hood though. I do know that for a blog like this a static site generator is just fine. In fact
[assemble][assemble-io] did a great job but I was stuck with [Grunt][grunt] while I was desperatelly wanted to move to
[gulp][gulp]. Not that it has a big difference, but it is more fun to play with pipes rather than trying to configure
plugins.

I was waiting for the new version of [assemble][assemble-io] for a couple of months (more that a year actually) as it
supposed to add support for both building tools. Unfortunatelly the github repo seemed inactive the whole time so I
assumed that it was just another dead javascript project. It looks like there is some activity latelly but unfortunatelly
that was after I started working on the revamp of the site.

On top of the above I really wanted to explore gulp plugins. So I said, let's create a set o minimal plugins that could
create my static website out of my markdown files. Ofcourse I could't stop thinking about [react][reactjs] and
[typescript][typescript], so inevitably there should be something based on that.

The typescript part was easy. All I had to do is to write my gulp plugins with that. But react being a client side framework
was not that straight forward to use it. Of course you could use it to create static markup but it is not it's main application.
That was the reason I was forced to find a problem so that I could apply react on it. I did not have to think that much though.
The new big idea in javascript is the [isomorphic][isomorphic] application. Which means that you should have the same code on
the server and client. So I had pretty much what I needed.

## The plan

Create a set of gulp plugins to transform the articles written in markdown to proper html files. The whole layout of that html
should be a react component (making use of other react components). Once the markup is created wrap it with the appropriate html
head and "serve" it. In our case, serve it, means store it for later use.

Once served, the html should bootstrap the same react component with the same input (markdown file) but intercept the links so
that there will be no need for further page reload. Next page should be one ajax call away.

At the end of the day I ended up with something like the following

```js
module.exports = function (gulp) {
  return function () {
    var plugin = require('../build/typescript/gulp');
    return gulp.src([
        'src/articles/**/*.md'
      ])
      .pipe(plugin.mdFile()) //create metadata out of the *.md files
      .pipe(plugin.toArticle()) //convert the metadata to articles
      .pipe(plugin.addIndex()) //add an index of all articles
      .pipe(plugin.addMetafiles()) //add metadata files as json
      .pipe(plugin.adaptPaths()) //make sure all files are in a folder named after the title
      .pipe(plugin.wrapHtml('src/templates/index.jade')) //wrap created html
      .pipe(gulp.dest('build')) //write the output
  };
};
```

which I hope is self explanatory.

### Marked react

Unfortunatelly I did not feel that good with using react's [`dangerouslySetInnerHTML`][dangerouslySetInnerHTML] so I had the idea
of making sure that markdown would directly get translated to react components. I was using [marked][marked] for my markdown and
luckily it allows you to provide custom renderer implementations. After some searching, I only found
[markdown-to-react-components][markdown-to-react-components]. It looks like that (till now) it is the only renderer that would
actually translate markdown to react components.

Due to absence of tests and the fact that the code was making use of regexp to find inline component placeholders and replace
them with the actual components, forced me to try to implement my own renderer. Just like any adventure, you start with a "how
hard can it be?". At the end of the day it took me more than I was expecting but managed to make [this][MarkedRenderer] work for
my cases. It is not a complete renderer though as I had to skip some abbreviations I did not use.

After that I felt I could get rid of github requests for gists stuff when showing an article and download everything on the creation
of the page (having the gists as metadata).

## tl;rd

All in all it was a very good excerise, with some performance benefits.

Ofcourse perfomance benefits is a little bit subjective as the initial page load costs now more but all the other requests are
superfast. The question is if a site like this needs such a thing, but as I said, it was a very good excerise.

The code can be found at [github][code].

[grunt]: http://gruntjs.com/
[gulp]: http://gulpjs.com/
[typescript]: http://www.typescriptlang.org/
[isomorphic]: http://nerds.airbnb.com/isomorphic-javascript-future-web-apps/
[dangerouslySetInnerHTML]: https://facebook.github.io/react/tips/dangerously-set-inner-html.html
[marked]: https://www.npmjs.com/package/marked
[MarkedRenderer]: https://github.com/valotas/valotas.com/blob/master/src/typescript/react/MarkedRenderer.ts
[markdown-to-react-components]: https://github.com/christianalfoni/markdown-to-react-components/blob/master/src/index.js
[code]: https://github.com/valotas/valotas.com/tree/master/src/typescript
