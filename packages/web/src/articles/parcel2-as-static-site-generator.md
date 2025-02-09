---
title: Parcel 2 as static site generator
author: valotas
date: 2022-03-20
tags: javascript
---

Felt like doing an update to my outdated website and ended up changing the whole generation of the static pages.

## Why Parcel

I've been working with parcel a lot at my daily job. Initially tried v1 out as a no config bundler and stack with it. It just works. At least most of the times. Then I saw the following:

<blockquote className="twitter-tweet"><p lang="en" dir="ltr">I&#39;ve been working on a documentation site powered by Parcel 2. Turns out, Parcel is a pretty awesome static site generator! 😲<br><br>🚀 Super fast!<br>😍 Statically rendered MDX at build time<br>✨ Interactive client rendered examples<br>🔄 Live reloading type docs extracted from the code <a href="https://t.co/dhzVz15W8V">pic.twitter.com/dhzVz15W8V</a></p>&mdash; Devon Govett (@devongovett) <a href="https://twitter.com/devongovett/status/1226954310161821696?ref_src=twsrc%5Etfw">February 10, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

And this is what made me want to try such a solution. On top of that, it would also give me the advantage of familiarizing myself with it's new plugin api.

The problem I am trying to solve is to transform a bunch of md files to html pages in a way that I can reuse the javascript that does the rendering on the server side. So, what I am looking for is an isomorphic static site generator. In order to do that, I will be using react to render the pages.

## Entry point

Initially I just created a transformer for my md files and something like `parcel articles/**/*.md` was enought to create the http files. On top of that the generated http file would go through the parcel pipeline and get optimized. Additionally any script referenced in it would also get bundled/hashed correctly and common scripts across files would get properly shared. Suprisingly what seems to be complex enough by describing it, was fairly straight forward with parcel. All I had to do was to create a custom transformer that could accept md files and spit html out of it. 

After I was done with that, I stumble uppon the actual problem. How to create an index file containing links to the generated html pages? In general I needed a way to create new pages making use of metadata of the pages that have been rendered. Went through some github issues and ended up with the following alternatives.

### Custom [parcel reporter](https://parceljs.org/plugin-system/reporter/)

That can listen to pretty much any parcel event and at the very end it can create the index files that I am interested in. Yet, since plugins should be side effect free, I felt like that was not the right solution. Aditionally I had doubts of the proper bundling of the exported file. For example I create an index.html referencing index.ts. Would that index.ts get properly trasnformed by parcel?

### Custom `index.md` file

Another solution would be to have a custom (most probably empty) index.md file and instruct parcel to treat it differently than the rest of the md files. That is what [react-spectrum's doc site](https://raw.githubusercontent.com/adobe/react-spectrum/7ce2c89e7ba11463b74bfc4d92a60e2e933ba9b6/packages/dev/docs/pages/index.mdx) is doing for example. Yet, I had to also add more files to the final bundle like `robots.txt` and `sitemap.txt` and would prefer a solution where parcel would also know about them. And that made me think of the following.

### `robots.txt` as entry

`sitemap.txt` that contain a list of all web pages of the specific domain. Basically in my case, all of the generated pages. Therefor all I need is a transformer for it to get a glob pattern as an input (in my case a `**/*.md`), resolve the files that are described by that, add them as a dependency to the build and adapt the content of sitemap.txt to contain the resolved files.

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

This leaves me though with another file that I need published but should not be included to sitemap.txt. That is `robots.txt`. Ofcourse since I am anyway have to create a transformer for sitemap.txt, I can make be able of skiping files referenced there. Yet, that did not feel good especially when robots.txt should reference sitemap. So, ended up using it as the entry point. So, I had the following:

```
Sitemap: ./sitemap.txt
```

that should be transformed to

```
Sitemap: https://valotas.com/sitemap.txt
```

adding sitemap.txt to the bundle graph, and from there on, continue with the transformation of sitemap.

## Implementation

The implemntation finally needed a [transformer](https://parceljs.org/plugin-system/transformer/) for robots.txt, one for sitemap.txt, an md transformer and a transformer that could get the rendered body of a the last one and wrap it within a page skeleton.

That last thing, needed also a [resolver](https://parceljs.org/plugin-system/resolver/) in order to let parcel know of files referenced to the html template used for wrapping the body.

Since I needed the whole thing to be isomorphic, I had to also create some metadata of each page that I was rendering available as a resource so that I could fetch it and render it without having the browser to do a full page request. That means that the sitemap transformer was also adding a json file to the dependency. So for each `name.md`, I had `/name/index.html` and `name/meta.json` added to teh bundle graph.

Finaly since I also wanted to make a folder for each given md file, a [namer](https://parceljs.org/plugin-system/namer/) also needed. Was kinda afraid that this thing was not going to end, but eventually didn't need anything else.

With a `.parcelrc` that looked like:

```json
{
  "extends": "@parcel/config-default",
  "transformers": {
    "*.txt": ["@valotas/parcel-transformer-staticsite/txt"],
    "*.md": ["@valotas/parcel-transformer-staticsite/md"],
    "*.meta": ["@valotas/parcel-transformer-staticsite/meta"],
    "*.htmlbody": ["@valotas/parcel-transformer-staticsite/htmlbody"]
  },
  "resolvers": ["...", "@valotas/parcel-resolver-staticsite"],
  "namers": ["@valotas/parcel-namer-staticsite", "..."]
}
```

was able to have a static site under `/dist` ready to be served.

### AWS uploading

The only thing left was to upload the created assets to aws. That was the case where a [reporter](https://parceljs.org/plugin-system/reporter/) seemed the right thing to do.

I was hoping to come up with something abstract enought but did not make it. Yet, the solution if it can inspire someone is available [here](https://github.com/valotas/valotas.com).
