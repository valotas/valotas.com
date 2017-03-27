---
title: An overview of Devoxx 2013
date: 2013-11-21
---
So, devoxx 2013 is over. My first java community (or not) conference is over. The thing is that devoxx is not about java. It is more a technology/programming conference which I personal find it even better as you have a better overview of what is going on and what the future will be.

## Java vs Google
Having said that, we must have always in mind that it has it's roots in to the java world, but I'm pretty sure that it can make it without it. Just like a lot of parts of google have been build with java, it is not the google can not leave without it. Oh, did I say google, yes, that is maybe because if you take the half of the talks out of the conference you end up with... [AngularJS][angularjs] and [dart][dartlang]. And that is by considering android talks java related. So let's dive into what I got from this conference.

### Java 8 is here
I mean, it has not been shipped, but finally the language gets lambda support. That was the most significant thing I took from Mark Reinhold and Brian Goetz. As the last one said, we know that the community has been expecting that for a long time but it was a hard thing to implement something in a way to maintain backwards compatibility.

Never the less, we'll be soon able to use this new idiomatic future of java. Apart from that I saw Mark Reinhold's need to state that java is not dead. It was his closing statement, but it was kinda comic to try to convince  3500 mostly java developers that already paid to attend a java conference that java is not dead. Of course we can take this statement as Oracle's submition to the java language and this is quite exciting.

From the other point of view, he could just feeling the presure of the competition (Kotlin, Ceylon, Dart, Clojure, Javascript, Scala, Groovy gave their presence to the conference)

### IoT
In fact one other thing that came to my attention was the [IoT](http://en.wikipedia.org/wiki/Internet_of_Things) (Internet of things). I never really though seriously about it, but it looks like an emerging market (for developers and not only). Java wants to be part of this market and that for there was some talks regarding this. For sure a thing to keep an eye on.

## Not only Java
As I said before, devoxx is not only java and the proof of that is that two big sponsors of the conference, RedHad and Google, have chosen Devoxx to announce the stable (v1.0) release of their new language. So Redhat announced [Ceylon](http://ceylon-lang.org/) and Google announced [Dart][dartlang]. Guess what, both of them are compiling to this strange bytecode called javascript :).

That is another interesting thing. We do not like javascript but, we write code compiling down to javascript in order to be able to run it everywhere! Any way, I did not follow the ceylon stuff, but I'm follow dart for [about a year](https://github.com/valotas/mustache4dart) now.

### Dart
So, a language that looks like a hybrid of java and javascript, has it's own virtual machine but compiles also down to javascript (or should I say optimized javascript). It supposed to be a language for structured web apps that does not fragment more the web browsers. Yes this is google's description.

Of course I do not know how yet another language for the web will not fragment web browsers. For sure Google will try to push it as much as possible. I can not think that it has been announced by coincidence at the second's day keynote with the title "Shaping the future of web development". On top of that, I heard Lars Bak saying that soon Chrome browser will get shipped with the dart virtual machine in order to run natively dart applications.

### AngularJS
For sure Dart was the thing for the second day of the conference, but all the previous days google was busy giving talks about the cool javascript framework called [AngularJS][angularjs]. I did not follow most of the talks there as I'm aware of the framework and used it, but just to give you an Idea of how good it is, google is in the process of porting it to Dart too :).

Given though the fact that the framework is popular enough already, I would not expect 25 talks (that is the number the Java Posse guys counted) been given by almost the same guys.

Never the less, it is my framework of choise for sometime now.

### Google glasses
Last day has been dominated again by google and the google glasses presentation. For some reason I'm not interested in this so I just picked a more java related thing to attend.

### Chrome Apps / HTML5 Apps
That was the most interesting for me. I did not know that chrome provides you with the tools to create a native app using html5. You can find more info at [here](http://developer.chrome.com/apps/about_apps.html).

It looks like google wants everything to be done in the browser and that is why dart on chrome make sense for me. On the long run, as soon as the user comforts himself with the browser they'll just port the browser to [something else](http://www.chromium.org/chromium-os). Ofcourse that means that everything will then be so easilly installed to your machine, you'll just go to the chrome app store and just install. From the other point of view, google will be in charge of all your apps so I would rather go with [something in between](https://github.com/rogerwang/node-webkit). Node-Webkit looks like it's trying to do the same thing. Of course you do not have the easyness of click and install but you can still have your html5 app running "natively" on your OS of choise.

## Buzz words
A new buzzwords to put at my vocabulary is *Reactive* programming. There are was some talks about it. I attended one but Joshua Suereth spend about 20 minutes trying to explain how the java api of the play framework would have been with the new lambda support of java. For sure the worst talk of the conference so far.

## Room for improvements
This is not for criticizing the event, but rather remarks to get better. Some of the talks were more like an advertisement. There is a remedy for that though, filter out the talks where there is no engineer talking.

The food was bad but again you do not go there for the food. Still, if you want to have fun, just search for [#devoxx salad](https://twitter.com/search?q=%23devoxx%20salad&src=typd) at twitter.

And a remark to Microsoft which surprisingly was one of the main sponsors. Next time come with something cool for developers. [Typescript](http://www.typescriptlang.org/) for example, is much more appealing to a software engineer that how Azure works.

[angularjs]: http://www.angularjs.org/
[dartlang]: http://dartlang.org/
