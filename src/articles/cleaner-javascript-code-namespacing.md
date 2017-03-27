---
title: Cleaner javascript code - namespacing
date: 2009-08-26
---

Having read the *Clean Code* book by Robert C. Martin I always try to follow most of the rules he gives. In my opinion the best rule I've seen and helped me a lot in order to make more readable code is to try to make classes as small as possible.

## Javascript

Well this is possible with languages that support classes or any other type of file based code dependency (is there an actual term for this?). But what happens with languages like... javascript. Not that you can't split your code in separate js files, but the most known performance rule for is to have as less js files as possible. This is where frameworks like jawr comes, but this is not the topic of this blog post.

What I'm trying to have is as much readable code as possible at one big javascript file. Having written a lot of (bad) javascript code, I really understand the needing of the clean code. So lately what I tend to do one thing:

## Namespacing

Yes client side javascript as we know it at the moment, does not have native support for it but how many times have you seen `YAHOO.util.Event` or `jQuery.fn.pngFix`? The good part here is that you understand from the first time you see the code what is all about and if you don't you will be able to search for help at the right place.

When you write your own code most of the times you don't have to search for help but you must be able to understand what you are writing. The test for a really clean code is to be able to understand your code as fast as possible after some period of time, let's say one month without looking at it.

So you can have namespacing...

```javascript
var mySite = {
  validation: {
    validationofsomethig: function() {
      //do some validation
    }
  },
  ajax: {
    requestsomething: function() {
      //do the request
    }
  }
};
```

Not only you can have namespacing but can also add stuff later:

```javascript
mySite.validation.bettervalidation: function () {
  //do some better validation
};
```

or

```javascript
mySite.moduleX = {};
mySite.moduleX.doSomething = function() {
  //do something!
};
```

Now when on your code see something like `mySite.moduleX.doSomething()` where will you start looking for more information? Hope not on the `mySite.moduleX` "namespase"!


