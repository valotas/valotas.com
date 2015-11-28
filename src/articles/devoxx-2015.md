---
title: An overview of Devoxx 2015
author: valotas
date: 2015-11-22
published: false
---

This year's devoxx was once again an excuse to write a new blogpost.

## Before 2015
I was lucky enough to attend the two previous conderences:

- [An overview of devoxx 2013](/an-overview-of-devoxx-2013/)
- [An overview of devoxx 2014](/devoxx-2014/)

Although that can be nothing compared to other attendands, it gives me something to compare.

## tl;rd

Based on the talks I saw last two times during the univercity days, I thought it would be better to just skip them. The rest of the conference gave me a bitter sweat taste, as either I did not see anything more than I expected or my expectations were not that big because of lack of big events during this year. 

The most interesting talk for me, was ["Graal.JS - high-performance JavaScript on the JVM"][graal-js]. The title is misleading here, as it has not to do with javascript on the JVM directly but with polyglotism on the JVM. Worth checking it out I believe.

Regarding the rest of the conference, let's break it up to smaller peaces...

## University days

As I said I did not attend them as I felt that they were too "boring" the last to years. The combination of 3 hours duration and lack of actual hands on programming, makes you wanting to change the topic as soon as possible. To given you an example, I can only remember one of these talks where the speaker managed to timebox different aspect of webdevelopment and speak for each one a couple of minites.

It can of course be my taste, as some friend of mine told me that they found the first 2 days this year much more interesting.

Anyway, keeping someone interested for 3 hours is not an easy job, and this is why the days have been named University days. The attendant should be willing to stay and filter the information he gets.

So let's get to the actual conference days...

## The bigger ever

It looks like this year's devoxx was the bigger ever. I think it was about 3500 attendees, or to put it by another way it was big enough to xxxx get rid of xxxx all neck wraps for the entrance tickets. Yes, this time there was no wrist wrap, but rather a simple neck wrap (if you were not late) with a printed bar code on it. Not that cool but for sure much faster as a process. At least this time I did not have to wait more than 3 minutes at the queque.

Apart from [Devoxx Belgium](http://www.devoxx.be/), there were also [Devoxx UK](http://www.devoxx.co.uk/), [Devoxx PL](http://www.devoxx.pl/), [Devoxx FR](http://www.devoxx.fr/) and [Devoxx MA](http://www.devoxx.ma/) along with bunch of [voxxed days](https://voxxeddays.com/), which I did not keep track of. It looks like the conference market is expanding and [Stephan](https://twitter.com/Stephan007) make use of it.

Although the bigger devoxx ever, there were no major problems with overcrouded XXXXXXXXXXXXX cinema?

## The keynotes

From the technology point of view, these were the purest ever keynotes I've ever seen. No big announcements, which was kind of expected as no ground breaking technology made it into this year's radar.

So it was mostly Stephan announcing the end of parleys and immediate use of youtube/vimeo for publishing conference videos. It is a pitty for parleys but I got the feeling that the  whole conference got a huge marketing push as speakers could reference to their talks a couple of hours after it.

Then [Mark Reinhold](http://mreinhold.org/) took the step to talk about jdk9 and mostly about modulatity.

Finally theoretical physics professor [Lawrence M. Krauss](https://twitter.com/LKrauss1) talked about how irrelevant was what we were doing at devoxx. I do not know if that is the best way to start a conference, but for sure it was the [best talk](https://www.youtube.com/watch?v=T-Kf2dR_SrQ) of day one.


## Lack of advertisements talks

I did tweet the following:

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">No advertising talk till now at <a href="https://twitter.com/hashtag/devoxx2015?src=hash">#devoxx2015</a> either my filter works better or there is an improvement there!</p>&mdash; Yoryos Valotassios (@valotas) <a href="https://twitter.com/valotas/status/664743040448376832">November 12, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Although someone can argue that there were not any marketing talks, I have to say that this time were not that obvious ones. This is in my opinion a major improvement. I can understand the need of them but I do not see what they can bring in terms of marketing if there are only a couple of people watching them.

A very good example of such a talk in my opinion was [The Twelve Factor app: Best Practices for Java Deployment](https://www.youtube.com/watch?v=94PxlbuizCU) where you at least got a couple of usefull information regarding the [12 factor app](http://12factor.net/) (which in my opinion is 12 rule of thumbs for creating microservices) and the only advertisement was that you could deploy that super easy with heroku.

As I said before there were not big news this year and maybe that is whay there were no interest from companies to advertise anything. In any case, the main sponsors of this year's conference where not any big names like Google, Microsoft or Oracle as it used to be.

## Trends

As I said before, no big news, but there are some trends you can see. It looks like reactive programming and microservices are still the thing this year.

### Reactive programming

Working with streams has been the thing for some years now. As I watched some talks on this topic the previous years, I skipped these talks this one. Unfortunatelly, Java has only recently added basic support for that with the changes of JDK8, which means that it lacks the apis on the EE side and not only. 

There are solutions available. Mainly [RxJava](https://github.com/ReactiveX/RxJava) and [akka](http://akka.io/) based ones from typesafe. I still ask myself though if I'm going to depend for example on an sql server, how am I going to be reactive if I have to wait anyway for a response. I have to wrap the sql api to something reactive, but this is not the standard anymore. Not that it is bad, but for let us know that it will take a while till reactive will be widelly adopted.

### Microservices

Yes, microservices are still the trend. Unfortunatelly, the term is so abstract, that you can take everything for a microservice. For some reason I tend to agree with what Hadi Hariri said about them, at hist funny talk: [The Silver Bullet Syndrome][silver-bullet].

- [ ] have to find out where exactly mentions microservices 

Never the less, if you  would like to play with microservices, I haven't been to a talk on this topic without hearing once [Spring boot](http://projects.spring.io/spring-boot/). It looks like it does the job just fine, but it doesn't mean that there are no alternatives.

- [ ] Add some alternatives

## What about the JVM?

Back to [Graal.js][graal-js]...

When we are talking about Java, we are mostly refering to the Java as a language. This wouldn't be possible without that beast called JVM. I did not spot any JVM specific talks to be honest, but I did found one whith a title that was giving you the impression that it was yet another javascript on the jvm implementation.

Aparently the talk was mostly about how mature the JVM became and how it can nowadays be used as a platform from other languages. Given the number of languages implemented on top of that, this is not new news, but the interoperability of them it is. It worths having a look at the talk, to see how javascript code has been used from within [R code](https://www.r-project.org/).

## Have to watch

Last but not least, here are the talks I found interesting (event if I did not attend all of them) with no specific order:

- [Graal.JS - high-performance JavaScript on the JVM][graal-js]
- [The Silver Bullet Syndrome][silver-bullet]

[graal-js]: https://www.youtube.com/watch?v=OUo3BFMwQFo
[silver-bullet]: https://www.youtube.com/watch?v=3wyd6J3yjcs
