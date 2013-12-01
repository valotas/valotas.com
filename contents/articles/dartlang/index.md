---
title: Some thoughts on Dart language
tags:
  - Dartlang
---

So google choose to announce the release of the production ready dart lang at this year's devoxx. That was though mostly a rebrand of the 0.8 version that was available some weeks earlier but that is marketing.

For some reason I  felt like I should try the language earlier so I found a simple project to try to implement it with it. Apparently as dart is at version 1.0, I felt like I should also rebrand my latest branch of mustache4dart to v1.0, but given that I've used it for about a year now, I though that it is the right time to write some things about the language.

## First impression
Unlike most of the new programming languages, this one comes with an IDE (based on Eclipse) and it makes it much more simple to get start with. That was a really good first impression.

Apart from that, given my java background, I can say that I felt really familiar with the language it self. The syntax has been kept really close to java and c# and it looks like that was on purpose. They really wanted to make it easy for every java and c# programmer be a dart programmer and I can say that they managed to do that. From the other point of view though, I do not know why, at the year 2013, man should be using semicolons on the end of each line at my code.

### Getters and setters
A thing that was new to me was the getters and setters of the language, something that you can find with C# but not with Java. To be honest I can not see the need of them as they look like methods and they act like methods, but they should not be used like ones (ex: do not try to perform an IO operation with a getter or setter). In java world the same rule applies with the exception that you must always provide a getter/setter method for each of your fields you would like to be accessible. 

So I personally do not see the need to have yet another syntax for them, but I would like to have them without writing them (thank you [project lombok][lombok]).

### Named parameters
A thing that I liked with the language is the ability to have named parameters. This is really cool and something that would make for example the builder pattern in java to go away. I do not now if such a thing exists with C# but given the fact that its progress as a language is much faster than java's I wouldn't expect not to have something like that.

### Constructors
Another interesting thing is constructors. First they are much more concise which I liked (event though the syntax may look awkword at the beginning). Second each class can have more that one named constructor. I tend to think of them as java's static methods constructors. Lastly there is the so called factory constructor which can only be used as... a factoty method! Generally I do not know how much of a help are these features and only time can tell. For sure they where targeting the removal of the factory object and/or static method factory patterns. I have to say that I'm quite skeptical about them as they are introducing new patterns. For eample a factory constructor can only be used in conjuction with another named one.

### Functions
One of the good parts of dart are functions. Yes, the language supports functions as first lever citizens. In fact every object can be used as a function by implementing a call method which I think is a good introduction to the feature to purelly object oriented thinking guys. Ofcourse there are also normal named and anonymus functions. After all lambdas are finally available to Java and it was for some time in C#. Javascript was born with closures and is more functional as a language rather than object oriented.

### Types
So, another thing that the dart guys tried to advertise is that it is an optionaly typed language. So you can start scripting and as soon as you grow you can start using types. In my opinion here is that they should make the language also attractive to javascript developers as the long term target for the language is to replace javascript. As soon as javascript does not have types it would be hard to enforce them in a new language. Using the language though I found myself dropping back to an untyped solution in cases where I did not want to have a complex api (not to introduce yet another method) but I do not know if it is good in the long run. For sure there are people in the programming language world who have more thoughts against optional typing.

### Asynchronous programming
Another interesting thing with the language is its support for asynchronous programming. Yes, you can do that with any language but good luck with java's Future object. When it commes to the ability of writing asynchronous code, javascript looks decades in front of java. What dart did was to take a programming model well known to the javascript world nowadays and standarize it with the use of it's `Future` implementation. Think of it as jQuery's Deferred object or Q library or as java's new `CompletableFuture`.

Although I'm slowly moving to a promise/future based way of thinking for async tasks and I'm still getting used to it, the api felt like fresh air to me.

## Some other's thoughts
Well, I am not a language expert and as it is a new language and it is from google, it is a little bit hard to find any serious arguments against the language. Though, there are some written at the beggining of the language:

- [Why dart is not the language of the future][dart-not-future]
- [Dart; or Why JavaScript has already won][js-won]

## Final thoughts
Just like anything new, it is a little bit hard to say if it will be successful or not. For sure google wants to push it and the whole strategy behind the language is to target as many developers as possible.

### One language to rule them all
So dart is targeting the web and that for javascript. There are some blog posts about [why it is cooler than javascript syntacticaly][dart-better-syntax] and a lot of comments stating that dart is what javascript should have been. Not surprising to me these comments are not coming from the javascript word.

The best break down of the language till now can be found at [this article][dart-launch] and I would like to copy what the author wrote:

    If you like Java and can’t get yourself to like JavaScript, you program Dart.
    If you like Ruby and can’t get yourself to like JavaScript, you program CoffeeScript.
    If you like JavaScript, you program JavaScript.

We like it or not javascript will be with us for a while. All the cool new programming languages targeting the web are getting compiled down to javascript and this can not be changed just by the introduction of a new one.

One thing though that I did not mention at all is that dart can be also run on the server side which helps a lot for the elimination of duplicated code. We tend nowadays to move most of our "application" code to the browser having stupid (or should I say stateless?) backend, but still, it really hearts me when I have to write input validation code on both the server and the client side.

For the moment the only solution there is, guess what, javascript with [nodejs][nodejs]. Some could also mention [clojure][clojure] with [clojurescript][clojurescript], but do not forget that it still compiles down to javascript. So, I should put Dart to the candidates of the "One language to rule them all" but can not be anything else at the moment.

### The future of Dart
Google of course has the resources and the market share (google chrome) to push for such a change. In fact during devoxx it has been said that at some point next year the dart virtual machine will ship with the official version of google chrome. Having said that, do not forget that microsoft tried some years ago to do that too with IE (more than 80% of the market share) and VBScript and just failed.

[lombok]: http://projectlombok.org/
[dart-not-future]: http://blogs.perl.org/users/rafael_garcia-suarez/2011/10/why-dart-is-not-the-language-of-the-future.html
[js-won]: http://www.quirksmode.org/blog/archives/2011/10/dart_or_why_jav.html
[dart-better-syntax]: http://www.grobmeier.de/10-reasons-why-dart-is-cooler-than-javascript-03012012.html
[dart-launch]: http://www.2ality.com/2011/10/dart-launch.html
[nodejs]: http://nodejs.org/
[clojure]: http://clojure.org/
[clojurescript]: https://github.com/clojure/clojurescript