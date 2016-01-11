---
title: Website revamp 2016
author: valotas
date: 2016-01-11
template: article.jade
---

A mixed combination of [react][reactjs] exploration, creativity and [assemble][assemble-io]'s inactivity, force to pop 
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

[grunt]: http://gruntjs.com/
[gulp]: http://gulpjs.com/
[typescript]: http://www.typescriptlang.org/
[isomorphic]: http://nerds.airbnb.com/isomorphic-javascript-future-web-apps/