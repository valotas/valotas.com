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

Although that can be nothing compared to what other attendands attended, it gives me something to compare.

## tl;rd

Based on the talks I saw last two times during the univercity days, I thought it would be better to just skip them. The rest of the conference gave me a bitter sweat taste, as I either did not see anything more than I expected or my expectations were not that big because of lack of big events during this year. 

The most interesting talk for me, was ["Graal.JS - high-performance JavaScript on the JVM"][graal-js]. The title is misleading here, as it has not to do with javascript on the JVM directly but with polyglotism on the JVM. Worth checking it out I believe.

A list of stuff worth watching in my opinion are the followings:


Last but not least, here are the talks I found interesting (event if I did not attend all of them) with no specific order:

- [Graal.JS - high-performance JavaScript on the JVM][graal-js]
- [The Silver Bullet Syndrome][silver-bullet]

Regarding the rest of the conference, let's break it up to smaller peaces...

## University days

As I said I did not attend them as I felt that they were too "boring" the last to years. The combination of 3 hours duration and lack of actual hands on programming, makes you wanting to change the topic as soon as possible. In other way, I can only remember just one of these talks. There, the speaker managed to time box different aspects of web development and speak for each one a couple of minutes. Which technically is more than one talk made by one guy.

It can of course that I'm just a little bit strange. The truth is that I haven't heard either anything really positive regarding the university days except from this years ones. Some friend of mine told me that they found the first 2 days this year much more interesting. Maybe I am just unlucky.

Anyway, keeping someone interested for 3 hours is not an easy job, and this is why the days have been named University days. The attendant should be willing to stay and filter the information he gets.

So let's get to the actual conference days...

## The bigger ever

It looks like this year's devoxx was the bigger ever. I think it was about 3500 attendees, or to put it by another way it was big enough to run out of neck wraps for the entrance tickets. Yes, this time there was no wrist wrap, but rather a simple neck wrap (if you were not late) with a printed bar code on it. Not that cool but for sure much faster as a process. At least this time I did not have to wait more than 3 minutes at the queque.

Apart from [Devoxx Belgium](http://www.devoxx.be/), there were also [Devoxx UK](http://www.devoxx.co.uk/), [Devoxx PL](http://www.devoxx.pl/), [Devoxx FR](http://www.devoxx.fr/) and [Devoxx MA](http://www.devoxx.ma/) along with bunch of [voxxed days](https://voxxeddays.com/), which I did not keep track of. It looks like the conference market is expanding and [Stephan](https://twitter.com/Stephan007) make use of it.

Although the bigger devoxx ever, there were no major problems with overcrowded rooms (or should I say cinema halls?).

## The keynotes

From the technology point of view, these were the poorest ever keynotes I've ever seen. No big announcements, which was kind of expected as no ground breaking technology made it into this year's radar.

So it was mostly [Stephan][stephan] announcing the end of [Parleys][https://www.parleys.com/] and immediate use of Youtube/Vimeo for publishing conference videos. It is a pitty for parleys but I got the feeling that the  whole conference got a huge marketing push as speakers could reference to their talks a couple of hours after it. This means that you can have now access to [all of the conference talks](https://www.youtube.com/channel/UCCBVCTuk6uJrN3iFV_3vurg).

Then [Mark Reinhold](http://mreinhold.org/) took the step to talk about jdk9 and mostly about modulatity. Given the fact the we've been talking about it for the last 3 major Java releases, I did not see anyone extremely excited about it.

Finally theoretical physics professor [Lawrence M. Krauss](https://twitter.com/LKrauss1) talked about how irrelevant was what we were doing at devoxx. I do not know if that is the best way to start a conference, but for sure it was the [best talk](https://www.youtube.com/watch?v=T-Kf2dR_SrQ) of day one.

## Lack of advertisements talks

I did tweet the following:

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">No advertising talk till now at <a href="https://twitter.com/hashtag/devoxx2015?src=hash">#devoxx2015</a> either my filter works better or there is an improvement there!</p>&mdash; Yoryos Valotassios (@valotas) <a href="https://twitter.com/valotas/status/664743040448376832">November 12, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Although someone can argue that there were no marketing talks, I have to say that this time at least were not that obvious ones. This is in my opinion a major improvement. I can understand the need of them but I do not see what they can bring in terms of marketing if there are only a couple of people watching them.

A very good example of such a talk in my opinion was [The Twelve Factor app: Best Practices for Java Deployment](https://www.youtube.com/watch?v=94PxlbuizCU) where you at least got a couple of usefull information regarding the [12 factor app](http://12factor.net/) (which in my opinion is 12 rule of thumbs for creating microservices) and the only advertisement was that you could deploy that super easy with [heroku](https://www.heroku.com/).

As I said before there were not big news this year and maybe that is why there were no interest from big names to advertise anything. 

## Trends

As I said before, no big news, but there are some obvious trends. It looks like reactive programming and microservices are still the thing this year.

### Reactive programming

Working with streams has been the thing for some years now. Unfortunatelly Microsoft who is I think the main player behind the whole reactive idea, did not present anything the last 3 years on devoxx. But this is another topic...

Back to reactive, as I watched some talks on this topic the previous years, I skipped these talks this time. Unfortunatelly, Java has only recently added basic support for that with the changes of JDK8, which means that it lacks the apis on the EE side and not only. 

There are solutions available. Mainly [RxJava](https://github.com/ReactiveX/RxJava) and [akka](http://akka.io/) based ones from typesafe. I still ask myself though if I'm going to depend for example on an sql server, how am I going to be reactive if I have to wait anyway for a response. I have to wrap the sql api to something "reactive", but this is not the standard anymore. Not that it is bad (spring or hibernate never was the standard for example), but it lets us know that it will take a while till reactive will be widelly adopted.

More about reactive can be found at [reactivex.io](http://reactivex.io/).

### Microservices

Yes, microservices are still the trend. Unfortunatelly, the term is so abstract, that you can give you own description. For some reason I tend to agree with what Hadi Hariri said about them, at his funny talk: [The Silver Bullet Syndrome][silver-bullet]. They are what SOAP used to be but, SOAP is so bad, you do not call to name them like that :)

Never the less, if you would like to play with microservices, I haven't been to a talk on this topic without hearing once about [Spring boot](http://projects.spring.io/spring-boot/). It looks like it does the job just fine, but it doesn't mean that there are no alternatives. Actaully there is one offering pretty much exactly what Spring boot does by embedding an application server with your app which I think deserves a serious look at. It is no other than [Wildfly Swarm](http://wildfly.org/swarm/) and you can goes which application server is used.

If you think that EE can not be used for microservices, [think again](https://www.parleys.com/tutorial/pico-services-java-ee-7-java-8-docker). If you don't like EE anymore, then there is what you can also checkout:

- [grpc](http://www.grpc.io/) for communication
- [spark](http://sparkjava.com/) for rest
- [dropwizard](http://www.dropwizard.io/) for a little bit more than spark
- [vertx](http://vertx.io/) which is kind of I can do everything framework

After checking them all out, let me know what kind of database microservice you are going to use. Although this comment is kind of sarcastic, when you do something, you have to remember that it is all about the code. So, have a look at [Microservices and Modularity or the difference between treatment and cure!](https://www.youtube.com/watch?v=O77777Zy_HE) and see how an EE application can be refactored to something osgi base (yes, it still lives).

## What about the JVM?

Back to [Graal.js][graal-js]...

When we are talking about Java, we are mostly referring to the Java as a language. This wouldn't be possible without that beast called JVM. I did not spot any JVM specific talks to be honest, but I did found one with a title that was giving you the impression that it was yet another javascript on the jvm implementation.

Apparently the talk was mostly about how mature the JVM became and how it can nowadays be used as a platform from other languages. Given the number of languages implemented on top of that, this is not new news, but the interoperability of them it is. It worth having a look at the talk, to see how javascript code has been used from within [R code](https://www.r-project.org/).

[stephan]: https://twitter.com/Stephan007
[graal-js]: https://www.youtube.com/watch?v=OUo3BFMwQFo
[silver-bullet]: https://www.youtube.com/watch?v=3wyd6J3yjcs
