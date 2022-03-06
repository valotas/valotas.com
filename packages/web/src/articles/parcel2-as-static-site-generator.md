---
title: Parcel 2 as static site generator
author: valotas
date: 2022-02-27
draft: true
---

Felt like doing an update to my outdated website and ended up changing the the whole generation of the static pages.

## Why Parcel

I've been working with parcel a lot in my day to day job. Initially tried v1 out as a no config bundler and stack in to it since it... just works. Then I saw the following:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">I&#39;ve been working on a documentation site powered by Parcel 2. Turns out, Parcel is a pretty awesome static site generator! 😲<br><br>🚀 Super fast!<br>😍 Statically rendered MDX at build time<br>✨ Interactive client rendered examples<br>🔄 Live reloading type docs extracted from the code <a href="https://t.co/dhzVz15W8V">pic.twitter.com/dhzVz15W8V</a></p>&mdash; Devon Govett (@devongovett) <a href="https://twitter.com/devongovett/status/1226954310161821696?ref_src=twsrc%5Etfw">February 10, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

And this is what made me want to try such a solution. On top of that, it would also give me the advantage of familiarizing myself with it's plugin api.

The problem I am trying to solve is to transform a bunch of md files to html pages in a way that I can reuse the javascript that does the rendering on the server side. So, what I am looking for is an isomorphic static site generator. In order to do that, I will be using react to render the pages.

## Entry point

Initially I just created a transformer for my md files and something like `parcel articles/**/*.md` was enought to create the http files. On top of that the generated http file would go through the parcel pipeline and get optimized. Additionally any script referenced in it would also get bundled/hashed correctly and common scripts across files would get properly shared.

After I was done with that, I stumble uppon another problem. How to create an index file containing a list of the generated html pages? Went through some github issues and ended up with the following alternatives.

### Custom [parcel reporter](https://parceljs.org/plugin-system/reporter/)

That can listen to pretty much any parcel event and at the very end it can create the index files that I am interested in. Yet, since plugins should be side effect free, I felt like that was not the right solution. Aditionally I had doubts of the proper bundling of the exported file. For example I create an index.html referencing index.ts. Would that index.ts get properly trasnformed by parcel?

### Custom `index.md` file

Another solution would be to have a custom (most probably empty) index.md file and instruct parcel to treat it differently than the rest of the md files. That is what [react-spectrum's doc site](https://raw.githubusercontent.com/adobe/react-spectrum/7ce2c89e7ba11463b74bfc4d92a60e2e933ba9b6/packages/dev/docs/pages/index.mdx) is doing for example. Yet, I had to also add more files to the final bundle like `robots.txt` and `sitemap.txt` and would prefer a solution where parcel would also know about them. And that made me think of the following.

### `robots.txt` as entry

`sitemap.txt` that should contain a list of all web pages of the specific domain. Basically in my case, all of the generated pages. Therefor all I need is a transformer for it to get `**/*.md` as input, compute the files that are described by a glob pattern, add them as a dependency to the build and adapt the content of sitemap.txt to contain the files.

Since the files have been added as a dependency, parcel will then pick them up and transform them. So I would like to have a sitemap that looks like the following:

```
src/**/*.md
```

and for each `.md` file get an output like

```
http://valotas.com/page1/
http://valotas.com/page2/
http://valotas.com/
```

with `src/page1.md` and `src/page2.md` added to the bundle graph.

This leaves me though with another file that should not be included to sitemap.txt but reference it. That is `robots.txt` and sice it has a reference to sitemap, why not using that as the entry point. So in this case the robots.txt looks like

```
Sitemap: ./sitemap.txt
```

and should be transformed to

```
Sitemap: https://valotas.com/sitemap.txt
```

adding sitemap.txt to the bundle graph.
