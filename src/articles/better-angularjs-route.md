---
title: Better $routProvider for AngularJS
author: valotas
date: 2015-03-03
published: false
---
So, you just did your first angularjs webapp and are ready for production. And then comes the requirement that before initilization you have to do an ajax request. There should be an easy way to do that right?

## The problem
Well, it looks like there is no straight forward way to solve this problem. And the funny think is that it is quite common practice to actualy run some initialization code before you let your angularjs app start. Now, what this has to do with routing and why it is a problem?

Till now I haven't seen a single angular webapp that is not using any kind of routing and the first out of the box solution is `ngRoute`. The thing is though that this module has been build with the idea that routes should be defined at the config phase. This looks like pretty logical except from the fact that you can only inject providers within the config phase.

That means that once your app starts, routing has allready been defined. If you force the user to start with a specific route, the initialization of the app should not be a problem. But if your user tries to reach `/route/xxx` without reaching let's say the root route (`/`) where all the initialization should take place, you have to problem of trying to use services and controllers depending of stuff that have been not properly initialized.

So a solution to the problem whould be to have a way to run **always** some initiliazation code before defining the routes so that angular can continue with the routing after that. And it looks like this is not possible in your config phase, as no services are available there and during run phase no providers are available.

## A `$routeProvider` provider
Now let's try a naive hack and find a way to inject `$routeProvider` after the config phase. Then we can configure it lazyly (let's say after our initilization). It looks like `$provider` is a service available at the config phase and we can use it to register new services/factories. So, let's try to create register `$routeProvider` service:

```js
.config(function ($provide, $routeProvider) {
  $provide.factory('$routeProvider', function () {
    return $routeProvider;
  });
})
```

This allows us to directly use `$routeProvider` later on in our app. An example which uses this technique can be found [here](http://jsbin.com/salini/edit).

## The `lazyRoute` module
As mentioned before such a solution whould only be considered as a proof of concept. Having that working though can let us provide a proper module which can make use of this technique.

So the requirement is to have at the end a route module that can be configured both on config and run time but should be initilized manually and a given init promise is resolved. Ideally we would like something like the following:

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
      initAfter: function () {return this},
      with: function () {return this},
      when: function () {return this}
    }
  };
})
```

### implement `lazyWhen`
So, the idea here is to just keep track of the arguments passed to the `lazyWhen` function for later use:

```js
.provider('lazyRoute', function ($routeProvider) {
  var lazyRoutes = [];

  this.when = function(path, route) {
    $routeProvider.when(path, route);
    return this;
  };

  this.lazyWhen = function(path, route) {
    routes.push({
      path: path,
      route: route
    });
    return this;
  };

  //rest of the implementation skiped
})
```

### implement the lazyRoute module (`$get` function)
No, let's try to implement our service which is what is returned by the `$get` function.

First of all the `when` function should delegate again to `$routeProvider`:

```js
this.$get = function () {
  return {
    when: function (path, route) {
      $routeProvider.when(path, route);
      return this;
    }
  };
};
```

then we should also store the `with` function so that we can later use it within the `initAfter`. That is easy enough:

```js
this.$get = function () {
  var withFn;

  return {
    with: function (fn) {
      withFn = fn;
      return this;
    }
  };
};
```

finally we need within the `initAfter` to wait for the given init promise to get resolved and then setup the lazyRoutes and call the `withFn`:

```js
this.$get = function ($route) {
  var withFn;

  return {
    initAfter: function (initPromise) {
      initPromise
        .then(function (initResult) {
          angular.forEach(lazyRoutes, function (r) {
            $routeProvider.when(r.path, r.route);
          });
          withFn(initResult);
          $route.reload()
          return initResult;
        });
    }
  };
};
```

An example with the full solution can be found at: 


## Angular new Router
Finally, it looks like the new angular's [router](https://github.com/angular/router) does not have the same problem as the injected service can be directly configured saving us from the encupsulation above.
