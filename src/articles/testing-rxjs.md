---
title: Testing RxJS
author: valotas
date: 2016-03-03
template: article.jade
---

When you hear for a new technology, all you want to do is just to use. This is how my experience with [RxJS][reactivex] started a while ago. It for sure cool, but also a new way of thinking. Just like anything else new, you are going sooner or later hit a wall. After grasping myself to find which sequence of operators whould do the trick, I tried to just test the thing.

[reactivex]: https://github.com/ReactiveX/RxJS

## Async testing

Well, no matter how close are streams to normal iterables, they are in nature async. You have a stream and at a moment you subscribe to it. This "one moment" plays a crusial role to your testing code. Most of the times you would like to test the behaviour right before or/and right after a specific event. Being carefoul, will make you pass the first test successfully, but as soon as you might need a little bit more, you will pretty soon find yourself strungling with the setup of you test just to have something like the following at the very end of the test

```js
someStream.subscribe((val) => {
    expect(val).toBeDefined();
    //any other expectation
});
```

## Marble tests 

If you also strunggled with that, let me tell you a well hidden secret: [marble tests][writing-marble-tests]. The real problem though is the lack of documentation. That means that I should do small baby steps in order to conform myself with the concept and how to use them. Given that, I thought it would be better to also write down my baby steps.

After some reading and [searching](https://blog.hyphe.me/rxjs-testing-in-real-world-applications/), I found out that it is all about the [`TestScheduler`](https://github.com/ReactiveX/RxJS/blob/master/src/testing/TestScheduler.ts) class that is provided with the framework.

### Stream creation

My first attempt wat to create a simple hot or cold observable and play with it:

<script src="https://gist.github.com/valotas/09f8fabc1a1db4b108b3.js?file=rxjs-marble-tests.js"></script>