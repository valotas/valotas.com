---
title: Promise.sequence
date: 2017-05-06
published: false
---

Since [`Promise`][promise] has been standardise, a lot have been eased to the callback hell world of javascript.
Lately I came across an interesting problem. What if you have a sequence of actions that you would like to execute
one after the other?

[promise]: https://www.promisejs.org/

## The callback solution
No matter how ungly it looks, with callback that was pretty easy implemented. Just call the new action inside of a
callback of the previous one.

```js
doSomething(, (err) => {
  doSomethingElse(() => {});
});
```

## Promise based solution
My chalenge here is to achive the same with Promises. The first that comes to someone's mind is the `Promise.all` but
there is a big catch there. I do need the actions to take place one after the other. So given some actions that return
a Promise as a result, I would ideally like something like the following:

```js
inSequence([action1, action2, action3])
  .then(([result1, result2, result3]) => {
    // do something with results
  });
```

The solution was very simple googling, but that kind of excerise can only help you sharp your Promise knowledge. So
Let's try to implement the solution. In order to attack the problem, I'll try to solve it with just 2 promises in the
dumpest possible way:

```js
var result = action1()
  .then(function() {
    return action2();
  })
```

Now, the question is, how can I make that work with more than 2 actions. In order to do that, let's start with the
`last` action, wait for it and once done execute the `next` one. Update the `last` reference with the combination of
both promises:

```js
var last = Promise.resolve();
actions.forEach(function (next) {
  last = last.then(function () {
    return next();
  });
});
return last;
```

This is the most common way of executing actions in a sequence with promises, Let's create a function for it:

```js
function simpleInSequence(actions) {
  var last = Promise.resolve();
  actions.forEach(function (next) {
    last = last.then(function () {
      return next();
    });
  });
  return last;
}
```

Now the question is, how am I going to keep track of the results too so that in the end I'll get a Promise who's
result with be something like `[result1, result2, ...]`. Since our actions are now executed in sequence, we can
just keep track of the results in an array:

```js
function inSequence(actions) {
  var last = Promise.resolve();
  var results = [];
  actions.forEach(function (next) {
    last = last.then(function () {
      return next();
    })
    .then(function (result) {
      results.push(result);
    });
  });
  return last.then(function () {
    return results;
  });
}
```

### Working with arrays
Now that we have a solution we can improve a lilte bit. When we have an array and we want to create a single
value out of it, we can use the `reduce` function of the array. We would like to reduce our array of actions
into one promise of arrays:

```js
function reduceInSequence(actions) {
  return actions.reduce(function (last, action) {
    return last.then(function (results) {
      return action()
        .then(function (result) {
            results.push(result);
            return results;
        });
    });
  }, Promise.resolve([]));
}
```

### Thinging more coplex
When I first tried to implement a solution I had in mind that I needed an implementation that could give me back a
Promise with an array of the results. I ended up using recursion for implementing it:

```js
function recursiveInSequence(actions, results) {
  results = results || [];
  var action = actions[0];
  return action()
    .then(function (result) {
      results.push(result);
      if (actions.length === 1) {
          return results;
      } else {
          return recursiveInSequence(actions.slice(1), results);
      }
    });
}
```

while the solution works just fine, it looks a little bit complexer, but I still have it writen here as a reminder to
always split problems as much as possible.

## How to test it
Really awesome work but without being able to test what we did, we are not falling in to the software engineers
category. To be honest, testing Promises is another challenge, but let's give it a try. So what I want to test
is that two given actions has been called in sequence. Let's create a factory of actions that can log their
result before returning a resolved promise:

```js
function action(delay, seq) {
  return function () {
    var result = "delay-" + delay;
    return new Promise(function (resolve) {
      seq.push(result);
      resolve(result);
    }, delay);
  }
}
```

Now all I have to do is check the `seq` array:

```js
it("should work with an array of more than 2 actions", function (done) {
  var seq = [];
  inseq([
    action(50, seq),
    action(10, seq),
    action(11, seq),
    action(5, seq)
  ]).then(function () {
    expect(seq).toEqual([
      "delay-50", // first action resolves after 50ms
      "delay-10", // second action resolves after 10ms
      "delay-11",
      "delay-5",
    ]);
    done();
  });
});
```

## TLDR
Since code speeks itself, you can [play with it](http://jsbin.com/gist/f785f29dff1502366554901ace772716?js,output) or
just have a look at it:

<script src="https://gist.github.com/valotas/f785f29dff1502366554901ace772716.js"></script>

# References
- [Promise][promise]
- http://stackoverflow.com/questions/24586110/resolve-promises-one-after-another-i-e-in-sequence

