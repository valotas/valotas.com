---
title: Scrap websites with nodejs!
date: 2011-08-27
---

I really wanted to experiment a little bit with nodejs.

## Target
So some days ago a friend of mine told me that he used a cool [python library](http://scrapy.org/) in order to scrap from a site the information he wanted to! So that sounded to me like a very good exercise!

## Solution
The idea is to use jQuery powerful selectors to extract whatever I wanted to from an html page. If I can do that, I can also extract the url of the next page and the put the mechanism to work again for the that page! The code I finally had to write was about 50 lines!

<script src="https://gist.github.com/valotas/1175447.js?file=scrapy.js"></script>

The conf argument that scrapy function expects should have a url (the page we want to filter), a `filterPage` function that filters the page and a findNext function that filters the page to find the next url that should be scraped. If you want to you can also provide a done function which will get called only when all the scraps will finish! Here is an example:

<script src="https://gist.github.com/valotas/1175447.js?file=run.js"></script>
