---
title: Testing RxJS
author: valotas
date: 2016-03-19
template: article.jade
---

When you hear for a new technology, all you want to do is just to use it. This is how my experience with [RxJS][reactivex] started a while ago. It is for sure cool, but also a new way of thinking. Just like anything else new, you are going sooner or later to hit a wall. After grasping myself to find which sequence of operators whould do the trick, I tried to just test the thing.

[reactivex]: https://github.com/ReactiveX/RxJS

## Async testing

Well, no matter how close should streams be to normal iterables, they are in nature async. You have a stream and at a moment you subscribe to it. This "one moment" plays a crucial role to your testing code. Most of the times you would like to test the behaviour right before or/and right after a specific event. Being carefoul, will make you pass the first test successfully, but as soon as you might need a little bit more, you will pretty soon find yourself strungling with the setup of you test just to have something like the following at the very end of it.

```js
someStream.subscribe((val) => {
    expect(val).toBeDefined();
    //any other expectation
});
```

## Marble tests 

If you have that problem, let me tell you a well hidden secret: [marble tests][writing-marble-tests]. After finding that our, you are going to have yet another problem and that is the lack of documentation on how to use them. That means more baby steps, more source code reading(thanks god, the library is written in typescript) and more experimentation. Given that, I thought it would be better to also write down experiments.

After some reading and [searching](https://blog.hyphe.me/rxjs-testing-in-real-world-applications/), I found out that it is all about the [`TestScheduler`](https://github.com/ReactiveX/RxJS/blob/master/src/testing/TestScheduler.ts) class that is provided with the framework. Still not that clear on how to use it.

### Stream creation

While in the [docu][writing-marble-tests], you have the `hot` and `cold` functions, there is no info on where to find them. It looks like they are actually part of the `TestScheduler`'s api:

- `createHotObservable<T>(marbles: string, values?: any, error?: any): Subject<T>` creates a hot observable
- `createColdObservable<T>(marbles: string, values?: any, error?: any): Observable<T>` creates a cold observable

My first attempt was to create a simple hot or cold observable and play with it:

<script src="https://gist.github.com/valotas/09f8fabc1a1db4b108b3.js?file=create-hot-cold-observable.js"></script>

Being happy about the first achievement, let's try to get one level up and subscribe to an observable after a period of time. Speaking in marbles, let's say that I subscribe to the following sequence: `--a-^-b-c-|`. That means that subscription should be notified only for `b` and `c`:

```js
it('should schedule the subscription on the right time', () => {
    //given
    const scheduler = new Rx.TestScheduler(null);
    const source = scheduler.createHotObservable('--a-^-b-c|');
    const results = [];

    //when
    source.subscribe((val) => {
        results.push(val);
    }, null, () => {
        results.push('done');  
    });
     
    scheduler.flush();
    
    //then
    expect(results).toEqual(['b', 'c', 'done']);
});
```

Guess what. This does not work. `TestScheduler` initialization alone can not cope with time. After some searching arround I found out how to let the scheduler schedule stuff and that is the `schedule` function. This accepts a closure where your time based part should be placed. Let's see how to achieve that:

<script src="https://gist.github.com/valotas/09f8fabc1a1db4b108b3.js?file=schedule.js"></script>

### Simplifying the expectations

Although, straight forward, it is a bit of code that you have to write in order to test a sequence of events and we haven't a way of testing the actual time (frame) that an event took place. In the [docu][writing-marble-tests], you see the existence of `expectObservable` function, but still no info on where to find it. This time I went straight to `TestScheduler` and it looked like it had what I needed:

- `expectObservable(observable: Observable<any>, unsubscriptionMarbles: string = null): ({ toBe: observableToBeFn })`

With that we can write expectations with marble strings just like we create the hot/cold observables, making testing much more easier.

It is though a little bit trickier to use, as we should first instanciate our scheduler with an assertion function. This will be used in order to assert the sequence of the events when `flush`ing the scheduler. That means that it should make our test fail. So either through and exception or just use your testing framework:

```
function assertEquals (actual, expected) {
    //we will use jasmine's api for the assertion:
    expect(actual).toEqual(expected);
}

const scheduler = new Rx.TestScheduler(assertEquals);
```

a full example would look like the following:

<script src="https://gist.github.com/valotas/09f8fabc1a1db4b108b3.js?file=expectObservable.js"></script>

## Experimenting

Finally if you feel like experimenting, which by the way is the only way of getting used to the library [this jsbin](http://jsbin.com/gist/c71a7aa41de5d03197a2) should get you up and running as it contains all the test cases we've discussed on this post. If you are only interesting in the code, here it is:

<script src="https://gist.github.com/valotas/c71a7aa41de5d03197a2.js?file=specs.js"></script>

[writing-marble-tests]: https://github.com/ReactiveX/rxjs/blob/master/doc/writing-marble-tests.md
