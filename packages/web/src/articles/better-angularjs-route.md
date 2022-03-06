---
title: Better $routeProvider for AngularJS
author: valotas
date: 2015-04-13
---
So, you just did your first angularjs webapp and are ready for production. And then comes the requirement that before initilization you have to do an ajax request. There should be an easy way to do that right?

## The problem
Well, it looks like there is no straight forward way to solve this problem. And the funny think is that it is quite common practice to actualy run some initialization code before you let your angularjs app start. Now, what this has to do with routing and why it is a problem?

Till now I haven't seen a single angular webapp that is not using any kind of routing and the first out of the box solution is `ngRoute`. The thing is though that this module has been build with the idea that routes should be defined at the config phase. This looks like pretty logical except from the fact that you can only inject providers within the config phase.

That means that once your app starts, routing has allready been defined. If you force the user to start with a specific route, the initialization of the app should not be a problem. But if your user tries to reach `/route/xxx` without reaching let's say the root route (`/`) where all the initialization should take place, you have to problem of trying to use services and controllers depending of stuff that have been not properly initialized.

So a solution to the problem whould be to have a way to run **always** some initiliazation code before defining the routes so that angular can continue with the routing after that. And it looks like this is not possible in your config phase, as no services are available there and during run phase no providers are available.

## A `$routeProvider` provider
Now let's try a naive hack and find a way to inject `$routeProvider` after the config phase. Then we can configure it lazily (let's say after our initilization). It looks like `$provider` is a service available at the config phase and we can use it to register new services/factories. So, let's try to register a `$routeProvider` service:

```js
.config(function ($provide, $routeProvider) {
  $provide.factory('$routeProvider', function () {
    return $routeProvider;
  });
})
```

This allows us to directly use `$routeProvider` later on in our app. An example which uses this technique can be found [here](http://jsbin.com/salini/edit).

## The `lazyRoute` module
As mentioned before such a solution whould only be considered as a proof of concept. Having that working though can let us create a proper angularjs module which can make use of this technique.

So the requirement is to have at the end a route module that can be configured both on config and run phase. It should be able to initilize routes after a given promise is resolved. Ideally we would like something like the following:

```js
.config(function (lazyRouteProvider) {
  lazyRouteProvider.when('/', {...})
    .when('/route', {...})
    .lazyWhen('/route/after/init', {});
})
.run(function (lazyRoute, initService) {
  lazyRoute
    .initAfter(initService.init())
    .with(function (initServiceResult) {
      lazyRoute.when('/another/route/after/init',{
        //config based on initServiceResult
      });
    });
})
```

So, let's try to split it up in steps.

### Dummy `lazyRoute` that delegates to `$routeProvider`
As we need something that should be configurable at config time we should go with an [angular provider](https://docs.angularjs.org/guide/providers). Let's see how it would look like:

```js
.provider('lazyRoute', function ($routeProvider) {
  this.when = function(path, route) {
    $routeProvider.when(path, route);
    return this;
  };

  this.$get = function () {
    return {
      initAfter: function () { return this; },
      with: function () { return this; },
      when: function () { return this; }
    }
  };
})
```

### Implement `lazyWhen`
So, the idea here is to just keep track of the arguments passed to the `lazyWhen` function for later use:

```js
.provider('lazyRoute', function ($routeProvider) {
  var lazyRoutes = [];

  this.when = function(path, route) {
    $routeProvider.when(path, route);
    return this;
  };

  this.lazyWhen = function(path, route) {
    lazyRoutes.push({
      path: path,
      route: route
    });
    return this;
  };

  //rest of the implementation skiped
})
```

### Implement the lazyRoute module (`$get` function)
Now, let's try to implement our service which is what is returned by the `$get` function.

First of all the `when` function should delegate again to `$routeProvider`. On top of that, we should also `reload` the `$route` service as it has allready been setted up. Reloading for every new route definition is not so efficient but ok for our proof of concept.

```js
this.$get = function () {
  return {
    when: function (path, route) {
      $routeProvider.when(path, route);
      $route.reload();
      return this;
    }
  };
};
```

then we should also store the `with` function so that we can later use it within the `initAfter`. We wrap the `with` function into a promise. That way, we can make use of it directly within `initAfter` but it will get executed only when it is resolved:

```js
this.$get = function ($q) {
  var deferredWith = $q.defer();

  return {
    with: function (fn) {
      deferredWith.resolve(fn);
      return this;
    }
  };
};
```

finally we need within the `initAfter` to wait for the given init promise to get resolved and then setup the lazyRoutes and call the `withFn`:

```js
this.$get = function ($route) {
  var deferredWith = $q.defer();

  return {
    initAfter: function (initPromise) {
      $q.all({
        initPromise: initPromise,
        withPromise: deferredWith.promise
      })
      .then(function (result) {
          var initPromise = result.initPromise,
              withFn = result.withPromise;

          angular.forEach(lazyRoutes, function (routeDefinition) {
            $routeProvider.when(routeDefinition.path, routeDefinition.route);
          });

          withFn(initPromise);
          return initPromise;
        });
      return this;
    }
  };
};
```

An example with the full solution can be found at: http://jsbin.com/jokibe


## tl;dr: Angular new Router
Finally, it looks like the new angular's [router](https://github.com/angular/router) does not have the same problem as the injected service can be directly configured saving us from the encupsulation above. Diving into this though is a very good excersize for exploring promises, angularjs provider and the a little bit of the `$route` service.
