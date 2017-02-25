---
title: Testing JS Promises
date: 2017-01-15
published: false
---

Not long ago I've experimented a little bit with [rx testing](testing-rxjs/). Still, many projects I'm involved did not
jump on the rx wagon and still work with the good (old?) `Promise` api. The question though remains the same. How can I
test async code written with the help of promises.

## The problem with promises

The first problem with promises is to understand what they are and how they work. Pouchdb contributor Nolan Lawson
[wrote a pretty introduction](https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html) and therefor I can
assume that you know the difference between the following four promise code blocks. If not, read the article before
continueing with this one.

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
        templateService.render({
          tweets: tweets
        });
    });
```

And here is the question: How do I test this code? Let's try to see what the code does and how to
test it. The `tweetService` will load the tweets and once loaded it will fire the callback function
given as an argument to the `then` function of the returned promise. So my test is to make sure that
when the tweets are loaded the render function is getting called with the new tweets.

For the second part all I have to do is mock the `render` function:

```js
spyOn(templateService, 'render');
```

 and make sure that is called:

 ```
expect(templateService.render).toHaveBeenCalledWith({tweets: newTweets});
 ```

Aparently I do not care how do I load the tweets, so I could also mock the `loadTweets` function.
This is where the thing is not so straight forward. `loadTweets` should return a `Promise`. Since
`Promise` is now a standard supported by most of the browsers, we can just return a promise that
is immediatelly resolved:

```
var newTweets = [
  "tweet1",
  "tweet2"
]
spyOn(tweeService, 'loadTweets').and.returnValue(Promise.resolve(newTweets));
```