---
title: Testing JS Promises
date: 2017-01-15
---

Not long ago I've experimented a little bit with [rx testing](testing-rxjs/). Still, many projects I'm involved did not
jump on the rx wagon and still work with the good (old?) `Promise` api. The question though remains the same. How can I
test async code written with the help of promises.

## The problem with promises

The first problem with promises is to understand what they are and how they work. Pouchdb contributor Nolan Lawson 
[wrote a pretty introduction](https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html) and therefor I can
assume that you know the difference between the following four promise code blocks:

```js
doSomething().then(function () {
  return doSomethingElse();
});
```

```js
doSomething().then(function () {
  doSomethingElse();
});
```

```js
doSomething().then(doSomethingElse());
```

and

```js
doSomething().then(doSomethingElse);
```

## The testing problem

Now let's consider the following code:

```js
tweetService.loadTweets()
    .then(function (tweets) {
        
    });
```

And here is the question: How do I test this code? Let's try to see what the code does and how to 
