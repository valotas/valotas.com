---
title: Unleash your creativity with Angular.JS
author: valotas
date: 2014-09-09
published: false
---

On 9th of September me and [Gion Kunz](http://mindtheshift.wordpress.com/) run a workshop for [ch/open][ch-open]. The idea was to introduce the basics of angular js so that someone could start experiment with it. During the workshop we did some excersizes with [jsbin][jsbin] we hacked together a [chat application][chat-application].

## Some notes for the workshop
For me that was the first time trying to help people on a subject outside of my coleague/friends cycle. Ofcourse I'm always more than excited to help, but when you are running a workshop, you always have some stress as the expectations are not the same. After all someone attending the workshop should take back what he came in for as you can not be next to him everyday at your work place.

This is how I started and although the workshop has been announced a little bit late, we tried hard to come up with something that would have been fun to programm and educational enough in order to get something usefull back.

## The workshop
We started with a very basic introduction to the angular.js framework and an example covering all the aspects that we whould talk about. The last was mostly to see how advanced/familiar was the audience with the framework.

### The basics
This is one of the most difficult stuff to come up with. Mostly because people tend to have different opinions on what is the basics of a framework but most improtantly because there is a huge difference on what you are about to describe in order to teach something. For example someone with a very strong programming background would consider the dependency injection and the providers of angular the basic stuff that someone should know about. After all DI is a foundamental thing on the backend and nowadays is taken for granted.

The problem with that aproach though is that you end up explaining theory which takes all the joy of programming away. Therefor we defined as basics some directives (let's call it special html markup) that would help us to create something. So, the introduction to the angular world was the `ng-app`, `ng-init`,  `ng-repeat` directives (we considered ng-app a directive) along with expressions. Interestingly enought, all that can help you make a page more interactive.

### Some more interesting stuff
After that we introduced `$scope`, `ng-controller` and `ng-model` which are the foundamental elements to start creating something usefull. To illustrate that we provided yet another todolist example: http://jsbin.com/cuqoc. Whoever is interested in, can try to do the exersizes of the workshop:

- Clear the input after adding the todo to the list
- Initialize the array with some tasks
- Implement a way to clear all the tasks

The important thing here is to understand what is a controller, how is it used and how our model is somehow bound to the html.

### Architectur or where you start to need DI
When you are happy enough to create your own apps, we come to the point that your controllers are big enough to be completelly unmaintainable. And this is where DI shines. Although a little bit difficult to illustrate the need, you at least can illustrate the coolness of it. That was the last excersise of the introduction to the framework. Modules and factories. We worked again on jsbin: http://jsbin.com/huguj and this time the excerisizes were:

- Modify the service in order to be able to add a task
- Implement a `clearAll` method (just like the previous example)
- Extract the version into a commons module and use it as a dependency

## Markdown chat app
Knowing all the above, we could dive more into an application. This time we created a [markdown chat application][chat-application] based mostly on what we learned before. The development was splitted in steps which we could change with the use of [git][git]. In addition to that we did before we also had the chance to also work with filters and touch the sourface of angular.js directives.

As this example was a little bit bigger we also had the chance to talk about where code should be, something that could only be illustrated with a [graph](http://slides.com/gionkunz/workshop-angular-js#/2/10). But again, theory and practice are only the same in theory, right?

On top of that you can also see a real use case where DI shines as we jumped from an in memory chat application to a backend based one by just changing implementation of one service. Again for someone comming from the backend world, that would be obvious, but in javascript I never felt that there was something as close to what I'm used to have on the backend as Angular. 

## References
- [The slides from the presentation](http://slides.com/gionkunz/workshop-angular-js#/)
- [The chat application at github][chat-application]

[chat-application]: https://github.com/gionkunz/md-chat-workshop
[jsbin]: http://jsbin.com/
[ch-open]: http://www.ch-open.ch/
[git]: http://git-scm.com/