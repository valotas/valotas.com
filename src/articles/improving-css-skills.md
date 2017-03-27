---
title: Improving CSS skills
date: 2016-06-08
---

This website is for me a continuous effort of skills improvement. It started with a ready static website generator to end up to something completelly custom made. One thing I did not touch though was the css stuff.

## The CSS journey
When I first started this blog, I just used the blogger platform. After some years of inactivity I felt like [moving forward](/migrated-to-assemble-io) using [bootstrap](http://getbootstrap.com/) that a friend of mine adapted for me.

As a "proper" developer I did not really touched css. Going a step further I moved to a [rewrite](/revamp2016) of the backend. Still the only affair I had with css was to optimise the bootstrap imports in order not to have to curry over all the thing that bootstrap provides but I never used.

After all the javascript related changes, I felt more obligated to work a little bit closer with css. Just like everytime I feel like improving somewhere, I set a simple goal. That was to get rid of bootstrap. Ofcourse I didn't feel like creating something from the beginning, I ended up just trying to integrate [ZURB Foundation for sites](http://foundation.zurb.com/sites.html).

All in all, this site is now using a bootstrapized version of foundation framework, dropping the css file size from `61kb` to `42kb`.

## How is it done?

Well, having an online version of the website, I just tried to make use of the foundation basics to make it look the same. So a new pipeline has been added to compile sass. The old less pipeline has been deleted and made use of the newly **empty** now `main.css`.

After the funny and socking time of working with a fully functional unstyled single page application, I started styling parts of the already structured site. Just by styling the header and the footer, I had something that I could see without getting scared. After that, all I had to do was to adapt the grid breakpoints to the ones bootstrap uses. On top of that I managed to also bring some stuff visually closer to what I liked more, without fighting with a frameworks defaults.

Most of the time the adaptation process for each block to be styled was like the following:

- Simplify html
- Import needed foundation module
- Provide a sass module with the rules needed for corresponding block

Needles to say, I ended up using way less stuff of the framework. More specific, out of 40 sass modules I only used 5.

## What I learned

Although I did not become an expert on anything and did not apply every single bit of what I read, I feel I improved my knowledge in terms of grid layout, [measurement units](http://webdesign.tutsplus.com/articles/7-css-units-you-might-not-know-about--cms-22573), [media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries) and a little bit of [atomic design systems](http://patternlab.io/).

It is really fantastic the amount of stuff that you can learn just by trying to understand some how something works with in a framework. For example you hear responsive and breakpoints. You have the classes you need to apply in order to be responsive but how does this work, will make use understand media queries and layouts (in general, or a grid in particular).

## To bootstrap or not

There are a lot of articles out there prasing or demystifying bootstrap. The truth is you have something good looking with minimum effort. You pay a price though. That is, minimum knowledge input, small flexibility of customization and a website that looks like... bootstrap.

Sooner or later you'll want something different. You can of course try to customise bootstrap. My main problem though was that I had to write html in a way that I can apply bootstrap. And this is how you end up having an html that is anything but semantic. I would love to provide a css with the very basics, but I did not want to rewrite a framework nor I feld that I could swim good enough in to the css world so that I could finish within a couple of hours. The intermediate solution was to use a customisable framework. I have to note though that bootstrap is customizable enough, but this time I wanted to learn something new and still I did not know if I could get rid of the html part of the bootstrap.

To be honest, I do not know if I would ever propose bootstrap as a framework for the frontend part of a website. Have in mind that twitter itself does not use it for their public website. Of course if within a team there is no person with serious css experience, I wouldn't hesitate. I also believe that in any project with an absence of a styleguide, a framework (no matter how bad it is) should be used. In that case though just make sure that you do not fall in to the ["Not invented here syndrom"](https://en.wikipedia.org/wiki/Not_invented_here) category.

## TL;RD

Back to where I started. If you would like to improve your css skills, you have to write css. It is ok to use a framework or to start with it, but you must be willing to go above it, customise it, adapt some things and finally replace parts of it with custom made css.

Rule of thumb: replace framework stuff that can be implemented with a simple straight forward way.
