---
title: Some thoughts on Dart language
tags:
  - dartlang
  - dart
---

So google choose to announce the release of the production ready dart lang at this year's devoxx. That was though mostly a rebrand of the 0.8 version that was available some weeks earlier but that is marketing.

For some reason I  felt like I should try the language earlier so I found a simple project to try to implement it with it. Apparently as dart is at version 1.0, I felt like I should also rebrand my latest branch of mustache4dart to v1.0, but given that I've used it for about a year now, I though that it is the right time to write some things about the language.

## First impression
Unlike most of the new programming languages, this one comes with an IDE (based on Eclipse) and it makes it much more simple to get start with. That was a really good first impression.

Apart from that, given my java background, I can say that I felt really familiar with the language it self. The syntax has been kept really close to java and C# and it looks like that was on purpose. They really wanted to make it easy for these programmers to be a dart programmers and I can say that they managed to do that. From the other point of view though, I do not know why, at the year 2013, we should be using semicolons on the end of each line at our code.

Regarding the differences with Java someone could take a look at [this article][idiomatic-dart]. I think it describes most of the key features of the language and someone can compare with his own favorite language.

### Getters and setters
A thing that was new to me was the getters and setters of the language, something that you can find with C# but not with Java. To be honest I can not see the need of them as they look like methods and they act like methods, but they should not be used like ones (ex: do not try to perform an IO operation with a getter or setter). In java world the same rule applies with the exception that you must always provide a getter/setter method for each of your fields you would like to be accessible and there is no special syntax for a getter/setter but a naming convention. This thing exists in C# though. 

I personally do not see the need to have yet another syntax for them, but I would like to have them without writing them (thank you [project lombok][lombok]). I know that I'm biased here but I'm just used to the java way of dealing with fields and the simple rule: never try to access them directly. C# and Dart gives you the ability to do so, as you can later on change the behaviour of what looks only as a field access.

### Named parameters
A thing that I liked with the language is the ability to have named parameters. This is really cool and something that would make for example the builder pattern in java to go away. I do not now if such a thing exists with C# but given the fact that its progress as a language is much faster than java's I wouldn't expect not to have something like that.

### Constructors
Another interesting thing is constructors. First they are much more concise which I liked (event though the syntax may look awkword at the beginning). Second each class can have more that one named constructor. I tend to think of them as java's [static factory methods][java-constructor] but with access to the object itself (there is a `this` available). So, if we would like to change the name of java's pattern, that would be factory methods.

On top of that, there is the so called [factory constructor][dart-factory-constructor] which is an unnamed [static factory method][java-constructor]. In any case the introductions of these features are targeting the elimiation of [java's object construction patterns][java-constructor]. While general this is a good thing (language without patterns), I've already seen the creation of yet another pattern which is the use of a factory constructor only in cooparation with another "internal" named constructor.

For sure the whole construction thing was a little bit strange at the beginning and I think both java and javascript developers will have to spend sometime until they'll learn to use them right.

### Functions
One of the good parts of dart are functions. Yes, the language supports functions as first lever citizens. In fact every object can be used as a function by implementing a call method. That is a good way to introduce the idea of function to a purely object oriented thinking guys. Of course there are also normal named and anonymous functions (lambdas or closures anyone?). 

After all lambdas are finally available to Java and it was for some time in C#. On top of that, Javascript was born with closures and is more functional as a language rather than object oriented. So there is no question, any language trying to replace them or just look familiar with them should support them.

### Types
Another thing that the dart guys tried to advertise is that it is an optionally typed language. So you can start scripting and as soon as you grow you can start using types. This is ofcourse not true. Comming from java, I was always thinking of typed solutions. While developing with dart, I found myself only to drop back to untyped api when I did not want to introduce yet another method for something not so important.

So I think that the optionally typed part was because it targets also javascript developers. As soon as javascript does not have types it would be hard to enforce them in a new language.

### Asynchronous programming
Another interesting thing with the language is its support for asynchronous programming. Yes, you can do that with any language but good luck with java's Future object. When it commes to the ability of writing asynchronous code, javascript way much better than java. What dart did was to take a programming model well known to the javascript world nowadays and standarize it with the use of it's `Future` implementation. Think of it as [jQuery's Deferred][js-jq-deferred] object or [Q library][js-q] or as java's new `CompletableFuture` (yes java is catching up there).

Although I'm slowly moving to a promise/future based way of thinking for async tasks and I'm still getting used to it, the api felt like fresh air to me.

## Some other's thoughts
Well, I am not a language expert and as it is a new language and it is from google, it is a little bit hard to find any serious arguments against the it. Though, there are some written at the begining of it's lifecycle:

- [Why dart is not the language of the future][dart-not-future]
- [Dart; or Why JavaScript has already won][js-won]

## Final thoughts
Just like anything new, it is a little bit hard to say if it will be successful or not. For sure google wants to push it and the whole strategy behind the language is to target as many developers as possible so that they can then push for the adaption of the VM to more browsers.

### One language to rule them all
Dart is targeting the web and that for javascript. There are some blog posts about [why it is cooler than javascript syntacticaly][dart-better-syntax] and a lot of comments stating that dart is what javascript should have been. Not surprising to me these comments are not coming from the javascript word.

The best break down of the language till now can be found at [this article][dart-launch] and I would like to copy what the author wrote:

    If you like Java and can’t get yourself to like JavaScript, you program Dart.
    If you like Ruby and can’t get yourself to like JavaScript, you program CoffeeScript.
    If you like JavaScript, you program JavaScript.

We like it or not javascript will be with us for a while. All the cool new programming languages targeting the web are getting compiled down to javascript and this can not be changed just by the introduction of a new one.

One thing though that I did not mention at all is that dart can be also run on the server side which helps a lot for the elimination of duplicated code. We tend nowadays to move most of our "application" code to the browser having stupid (or should I say stateless?) backend, but still, it really hurts me when I have to write input validation code on both the server and the client side.

For the moment the only solution is, guess what, javascript with [nodejs][nodejs]. Some could also mention [clojure][clojure] with [clojurescript][clojurescript], but do not forget that it still compiles down to javascript. So, I should put Dart to the candidates of the "One language to rule them all" but can not be anything else at the moment but a candidate.

### The future of Dart
Google of course has the resources and the market share (google chrome) to push for such a change. In fact during devoxx it has been said that at some point next year the dart virtual machine will ship with the official version of google chrome. Having said that, do not forget that microsoft tried some years ago to do that too with IE (more than 80% of the market share) and VBScript and just failed.

On top of that, considering languages that have been developed targeting javascript as a runtime (they compile down to javascript) such as [typescript][typescript], [coffeescript][coffeescript] or [clojurescript][clojurescript], it looks to me that dart falls in to the same category (as it compiles down to javascript) with the only advantage that it will run faster on chrome in the future.

Given though the fact that it comes with it's own vm, it looks more likely to me to see dart being a language for android or [chrome os][chrome-os] or [chome apps][chrome-apps] and then pushing for being the language for the web, rather than replacing javascript on the web.

[idiomatic-dart]: https://www.dartlang.org/articles/idiomatic-dart/
[lombok]: http://projectlombok.org/
[java-constructor]: http://stackoverflow.com/questions/13803032/java-constructor-and-static-method
[dart-factory-constructor]: https://www.dartlang.org/articles/idiomatic-dart/#factory-constructors
[js-jq-deferred]: http://api.jquery.com/category/deferred-object/
[js-q]: https://github.com/kriskowal/q
[dart-not-future]: http://blogs.perl.org/users/rafael_garcia-suarez/2011/10/why-dart-is-not-the-language-of-the-future.html
[js-won]: http://www.quirksmode.org/blog/archives/2011/10/dart_or_why_jav.html
[dart-better-syntax]: http://www.grobmeier.de/10-reasons-why-dart-is-cooler-than-javascript-03012012.html
[dart-launch]: http://www.2ality.com/2011/10/dart-launch.html
[nodejs]: http://nodejs.org/
[clojure]: http://clojure.org/
[clojurescript]: https://github.com/clojure/clojurescript
[typescript]: http://www.typescriptlang.org/
[coffeescript]: http://coffeescript.org/
[chrome-os]: http://www.chromium.org/chromium-os
[chrome-apps]: http://developer.chrome.com/apps/about_apps.html
