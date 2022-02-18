---
title: Tomcat init.d script
author: valotas
date: 2011-05-14
template: article.jade
---

For some reason allmost all the `init.d` scripts for starting and stoping tomcat just calls tomcat's `startup.sh` and `shutdown.sh` scripts. I am ok with that as far as they work. The startup script works just fine but when I want to restart or stop a tomcat instance, in most cases I have to just kill the process.

## A solution
So what I need is a way to try stop tomcat with it's shutdown script, wait a little bit to see if tomcat shutdown and if not just kill the process. The script below does exactly that.

<script type="text/javascript" src="https://gist.github.com/valotas/1000094.js?file=tomcat.sh"></script>

It would be much better to have a pid file at start time and use that one and not try to figure out the pid from ps. Maybe next version.
