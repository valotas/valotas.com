---
title: Promise.sequence
date: 2017-05-08
tags: javascript
---

Lately I came across a problem for which the standard [`Promise`][promise]'s api wasn't enough. I needed something
like `Promise.all` but I had to make sure that the actions array will get executed in sequence

[promise]: https://www.promisejs.org/

## Prerequisites
There is no reason reading more if you can't answer the question of [this blog post][problem-with-promises]

## Promise.inSequence
Ideally, I need a utility method that get as an input an array of actions. It executes the given actions one after the
other and every execution should wait for the previous one:

```js
inSequence([action1, action2, action3])
  .then(([result1, result2, result3]) => {
    // action1() should have been called first
    // action2() should have been called only after action1 finished
    // action3() should have been called only after action2 finished
  });
```

The solution was very simple googling, but I am not fun of copy & paste development if I do not understand what am I
copying, so as an excerise I though it would be a good idea to implement a solution myself. In order to attack the
problem, I'll try to solve it with just 2 promises in the **dumpest possible way**:

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

This is the **most common way of executing actions in a sequence with promises**, Let's create a function for it:

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

Now the question is, how am I going to keep track of the results too so that in the end I'll get a Promise which's
result will be something like `[result1, result2, ...]`. Since our actions are now executed in sequence, we can
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

Now we can slightly improve this by initializing a promise with an array and make sure that last will always resolve
to an array of the results:

```js
function inSequence(actions) {
  var last = Promise.resolve([]);
  actions.forEach(function (next) {
    last = last.then(function (results) {
      return next()
        .then(function (result) {
          results.push(result);
          return results;
        });
    });
  });
}
```

or even make use of `Promise.all` to avoid nested `.then` calls:

```js
function inSequence(actions) {
  var last = Promise.resolve([]);
  actions.forEach(function (next) {
    last = last.then(function (results) {
      return Promise.all([next(), results]);
    })
    .then(function (combination) {
      var results = combination[1];
      var result = combination[0]
      results.push(result);
      return results;
    });
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

### Thinking more coplex
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
Since code speeks itself, you can [play with it](http://jsbin.com/gist/valotas/f785f29dff1502366554901ace772716?js,output)
or just have a look at it:

<script src="https://gist.github.com/valotas/f785f29dff1502366554901ace772716.js?file=script.js"></script>

# References
- [Promise][promise]
- http://stackoverflow.com/questions/24586110/resolve-promises-one-after-another-i-e-in-sequence

[problem-with-promises]: https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html
