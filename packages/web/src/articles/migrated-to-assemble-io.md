---
title: Migrated to assemble.io
date: 2014-08-30
---

It was about time to get rid of the [blogger platform][blogger]. It serves well up to the point that you feel like your page is overbloated with stuff that you do not need.

[blogger]: https://www.blogger.com

## valotas.com
The new home of the blog is now valotas.com and all traffic from blog.valotas.com has been redirected there. The funny thing is that this new home is "hosted" at a [Raspberry Pi][raspberrypi] at my living room. Of course there is a cdn in front of it just in case it goes down, but I do not think that anybody will really care that much if my blog goes down for some minutes/hours (hopefully not days).

Back to the [blogger.com][blogger]. It is a decent platform and a lot have been improved especially on the backend, but this [wysiwyg][wysiwyg] editor is just killing me. I feel like it is poluting my text rather than transforming it to html. I would even add here proper html as it tends to wrap everything in to divs/spans with no reason. Having worked with [markdown][markdown], this thing looks like an overkill. You can always write simple html but then your writting stops being a writting and becomes something else.

I tried to ignore that, which is not so easy. Having your articles in simple text files is really concice and can be transfered wherever you want. Still as I tend to forget stuff, having everything in one place as an "article repository" ([blogger][blogger] in this case) was really handy. Having that in mind I tried to just write my stuff in simple html to keep everything clean. After all I do not write that often. So the authoring part worked pretty ok.

Then it comes the frontend. I am by no means an html designer, but still I do like simple stuff and the blogger layouts are by no means simple. Creating custom layout looks more like a hack where you have to always conform yourself with what blogger provides you. On top of that you have that javascript stuff that goes with your text that I never felt like checking what they do. Although I did not check, I was visiting my blog regularly from a pc and/or mobile and had some interesting lag. That should not happen at a simple html page right?

Back to the "article repository". I felt ok with blogger hosting my articles up to the point that [git][git] made it's debut in to my life. Combine that with [github][github] and/or [bitbucket][bitbucket] which both provide a service for git and some how this centralized article repository I had before, stoped being an advantage. In fact the decentralized one started to be more natural to what I had. On top of that you get versioning for free!

## assmeble.io
Having all the above was enough to make me change to something else, but I could not find that something else. [Github pages][github-pages] would have been a solution, but [jekyll's][jekyll] language ([ruby][ruby]) would have been yet another one that I had to deal with. In theory I wouldn't have to deal with yet another language, but somehow I always find something in a framework that I would like "improved".

Having persuaded myself that a static site generator would have been the best solution for my markdown text files (call them articles, pages or blog posts), I had to find something that would fit me. Fit me means, transforming my static text but also allow me to change layouts on demand. This on demand requirement is quite tricky as nobody wants to write plain css anymore nor to write javascript without jshint or tests. So this on demand means something that can blend in to the current css/js tool chain which is [grunt][grunt] or [gulp][gulp]. And this is where [assemble.io][assemble-io] comes in to the game.

In fact the whole site is a simple [git repository][valotas-com-git] that I can clone, edit and push anytime, anywhere. I have local preview and the deploy is a `grunt deploy` of my current preview away.

Surprisingly (or not) the site became much faster (plain html with css and only google analytics as javascript) and it is responsive something that blogger lacks for the moment.

That is all, enjoy my new web home :)

[raspberrypi]: http://www.raspberrypi.org/
[wysiwyg]: http://en.wikipedia.org/wiki/WYSIWYG
[markdown]: http://daringfireball.net/projects/markdown/
[github]: https://github.com/
[github-pages]: https://pages.github.com/
[bitbucket]: https://bitbucket.org/
[git]: http://git-scm.com/
[jekyll]: http://jekyllrb.com/
[ruby]: https://www.ruby-lang.org/en/
[grunt]: http://gruntjs.com/
[gulp]: http://gulpjs.com/
[assemble-io]: http://assemble.io/
[valotas-com-git]: https://github.com/valotas/valotas.com
