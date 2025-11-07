---
title: Unleash your creativity with Angular.JS
author: valotas
date: 2014-09-13
---

On 9th of September [Gion Kunz](http://mindtheshift.wordpress.com/) and me ran a workshop for [ch/open][ch-open]. The idea was to introduce the basics of angular js so that someone could start experiment with it. During the workshop we did some exercises with [jsbin][jsbin] and hacked together a [chat application][chat-application].

[ch-open]: http://www.ch-open.ch/
[jsbin]: http://jsbin.com/
[chat-application]: https://github.com/gionkunz/md-chat-workshop

## Some notes for the workshop
For me that was the first time trying to help people on a subject outside of my colleague/friends cycle. Of course I'm always more than excited to help, but when you are running a workshop, you always have some stress as the expectations are not the same. After all someone attending the workshop should take back what he came in for as you can not be next to him everyday.

This is how I started and although the workshop has been announced a little bit late, we tried hard to come up with something that would have been fun to program and educational enough in order to get something useful back.

## The workshop
We started with a very basic introduction to the angular.js framework and an example covering all the aspects that we would talk about. The last was mostly to see how advanced/familiar was the audience with the framework in order to adapt our exercises.

### The basics
This is one of the most difficult stuff to come up with. Mostly because people tend to have different opinions on what is the basics of a framework but most importantly because there is a huge difference on what you are about to describe in order to teach something. For example someone with a very strong programming background would consider the dependency injection and the providers of angular the basic stuff that someone should know about. After all DI is a fundamental thing on the backend and nowadays is taken for granted. Someone else would feel to talk about the binding capabilities of the framework as it is one of the coolest things.

The problem with either approach though is that you end up explaining theory which takes all the joy of programming away. Therefore we defined as basics some directives that would help us to create something. So, the introduction to the angular world was the `ng-app`, `ng-init`,  `ng-repeat` directives (we considered ng-app a directive) along with expressions. Interestingly enough, all that can help you make a page more interactive. And that is what we did.

### Some more interesting stuff
After that we introduced `$scope`, `ng-controller` and `ng-model` which are the fundamental elements to start creating something useful. To illustrate that we provided yet another todolist example: http://jsbin.com/cuqoc. Whoever is interested in, can try to do the exercises of the workshop:

- Clear the input after adding the todo to the list
- Initialize the array with some tasks
- Implement a way to clear all the tasks
- Implement a way to delete a specific task

The important thing here is to understand what is a controller, how is it used and how our model is somehow (or should I say automagically) bound to the html.

### Architecture. Or where you need DI
When you are happy enough to create your own apps, you easily come to the point that your controllers are big enough to be completely unmaintainable. And this is where DI shines. Although a little bit difficult to illustrate the need, you at least can illustrate the coolness of it. That was the last exercise of the introduction to the framework. Modules and factories. We worked again on jsbin: http://jsbin.com/huguj and this time the exercises were:

- Modify the service in order to be able to add a task
- Implement a `clearAll` method (just like the previous example)
- Extract the `version` into a `commons` module and use it as a dependency (try it with both other modules)
- Redefine the `version` value again on the footer module

Here we would like to find out how we use modules as it is the basic ingredient for an angularjs application. Most of the getting started guides do not talk about it, but it is something the sooner you learn it the better. So we thought it would be better to directly write apps using modules and it is an advise I give to any newcommer to the framework.

## Markdown chat app
Knowing all the above, we could dive more into an application. This time we created a [markdown chat application][chat-application] based mostly on what we learned before. The development was splitted in steps which we could change with the use of [git][git]. In addition to that we did before we also had the chance to also work with filters and touch the surface of angular.js directives.

As this example was a little bit bigger we also had the chance to talk about where code should be, something that could only be illustrated with a [graph](http://slides.com/gionkunz/workshop-angular-js#/2/10). But again, theory and practice are only the same in theory, right?

On top of that you can also see a real use case where DI shines as we jumped from an in memory chat application to a backend based one by just changing implementation of one service. Again for someone coming from the backend world, that would be obvious, but in javascript I never felt that there was something as close to what I'm used to have on the backend as Angular.

## What we did not do
One thing that I was really uncomfortable with, was the fact that we did not talk about testing. Angular has been built with testing in mind providing you everything that you may need to proceed with that. Still, we could not find enough examples that would be easy enough on their testing part so that we could spend the right time on the actual code. We are working on some ideas though and hope that we'll improve on that.

## References
- [The slides from the presentation](http://slides.com/gionkunz/workshop-angular-js#/)
- [The chat application at github][chat-application]
- [ch/open: Unleash Your Creativity with Angular.js](http://www.ch-open.ch/wstage/workshop-tage/programm-2014/ws-20-unleash-your-creativity-with-angularjs/)

[git]: http://git-scm.com/