---
title: An overview of Devoxx 2014
author: valotas
date: 2014-11-16
---

This year I was lucky enough to attend yet another time the [devoxx conference](http://devoxx.com). Here are what I saw/felt especially in regards to the my [previous visit](/an-overview-of-devoxx-2013).

## Java
This year the conference was a lot more about java. There was some sessions for other stuff too but did not have these 24 session for angularjs.

As it was about java, it was ofcourse about java8 and it's new features. So, as you may know lambdas have been introduced to java8 and this alone is enough to start building a lot more features on top of the platform.

So along with the lambdas, we had streams and a refined collections api that allows a more functional way of programming.

Having heard so much about lambda/streams, here is my thoughts. The feature bring easyness and beuty to the language mostly by reducing boilerplate code. No one likes boilerplate but remember that this boilerplate is information/documentation to the user. Therefore I would suggest to make use of it with extreme caution as it is really easy to misuse it in the name of coolness. So please have a second thought before you go ahead and refine your api.

## Reactive programming

Well, there is nothing new here as [Vlad](https://twitter.com/DevoxxBorat) said...

<blockquote class="twitter-tweet" lang="en"><p><a href="https://twitter.com/hashtag/Devoxx?src=hash">#Devoxx</a> <a href="https://twitter.com/valotas">@valotas</a> is not new. Is we use with .niet in Azamat for centuries</p>&mdash; Born to be Borat. (@DevoxxBorat) <a href="https://twitter.com/DevoxxBorat/status/533363657024233472">November 14, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

The thing is though that even with a delay of some years [reactive programming](http://www.reactivemanifesto.org/) becomes a trend to Java too (and once again in software engineering in general). There where some libraries for reactive prgramming before but lambdas again can make the existing apis much more fluent.

I believe a very good answer to most of the newbies questions would be [netflix's article](http://techblog.netflix.com/2013/02/rxjava-netflix-api.html) regarding the use of a reactive programming model. Interestingly, I find this post a very good abstract of [Venkat Subramaniam](https://twitter.com/venkat_s)'s [university session](http://cfp.devoxx.be/2014/talk/SUC-8683/Reactive_Programming:_creating_highly_responsive_applications) which was the most popular session within the 5 days of the conference.

## Docker

I do not think that there are much to say for this topic. [Docker][docker] can be described as a very light weight linux base vm. Everybody seems to be using it and it looks like it is a matter of time that you'll be using it. I do not believe that there is any question regarding it's benefits and therefor just go for it as soon as possible.

As a side note. I do not know if it is java developers disliking system programming, but I did not heard a single thing regarding the background of the tool. It is a success story for [Google's golang](https://golang.org/) but nobody felt like mentioning it.

## Google, Microsoft and others

Speaking of google, it's presence this year to the conference was really quiet. The keynote was about material design, something that was less to no interest to the developers. I do not know though how an audience accustomed to backwards compatibility would feel like to the news that one of the [last years' hot topic](https://angularjs.org/) will be a [new thing](https://www.youtube.com/watch?v=gNmWybAyBHI) with no migration path.

So regarding the web. Everybody should now switch to this new thing (angular.js v2) or use the other cool thing called [polymer](https://www.polymer-project.org/) which is focused on [Web Components](http://www.w3.org/TR/components-intro/). No big google logo anywhere, but still backed by it. And all that not mentioning the other new cool kid on the block, comming from facebook and called [react](http://facebook.github.io/react/). This fragmentation is driving me crazy!

Apart from that Microsoft's target was once more the marketing of the Azure platform and nothing more. That is again sad considering the [changes](http://www.forbes.com/sites/benkepes/2014/11/14/how-the-worm-turns-microsoft-open-sources-net/) that made public during the devoxx days. I would really like to see some more programming centric stuff from Microsoft in such a conference.

Finally this years devoxx had more non programming related stuff. A bunch of startup related stuff among with a talk regarding [creativity](http://thecreativedose.com/) by the Chief Creativity Evangelist (cool title) named Denise Jacobs. The talk was too American for my taske, but still a good addition to the conference.

## Devoxxed

This year [Stephan](https://twitter.com/Stephan007)'s idea was to get the first letters of the conference name and put them at the end of the remaining. There for something called [voxxed](https://www.voxxed.com/) was born which had it's first outage at the demo during the keynote. I do not know if was a good sign or not. What I know is that it is not only a site aiming to be the new theserververside.com or a better [dzone](http://java.dzone.com/). There will be one day devoxx conferences around Europe with the name [voxxed days](https://www.voxxed.com/voxxed-days/).

I do not know if the idea of mini devoxx conferences came first or not but I do like the idea of having some decentralization. Unfortunatelly this seems not to be working as the conference this year was overbooked even if there are another 2 taking place at the UK and France.


[devoxx]: http://devoxx.be
[devoxx-2014]: http://cfp.devoxx.be/2014
[devoxx-borat-nothing-new]: https://twitter.com/DevoxxBorat/status/533363657024233472
[docker]: https://www.docker.com/
