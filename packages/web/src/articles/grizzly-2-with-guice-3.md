---
title: Grizzly 2 with guice 3
author: valotas
date: 2011-05-30
template: article.jade
---

Playing with grizzly and guice. Considering that you already have a `ServletModule` and and a `GuiceServletContextListener` defined the above code should do the job.

## The code

First a handler

<script src="https://gist.github.com/valotas/999051.js?file=GuiceHandler.java"></script>

and the webserver:

<script src="https://gist.github.com/valotas/999051.js?file=WebServer.java"></script>

Still have to test it as I only had a simple servlet working!
