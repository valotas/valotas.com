---
title: Object oriented html
date: 2014-09-20
published: false
---

There is quite a buzz nowadays (2014) for functional programming and so we all try to move our thinking in a more functional way. Still, the object oriented approach seems to be the easiest way to understand and so to program at the end. The object oriented programming can be applied to any structural schematic. One of that structures though that we tend to forget is `html`. So, let's try to visualize the it.

## What is an html object
That is not that hard to think of if you know what is the [`DOM`][dom]. If you've written a little bit of javascript you used it in order to bind functionality to your presentation layer. To simplify things, think of every html tag as an object. [Object composition][composition] allows objects to contain other objects and there for you can have your `document` object to contain your paragraph object (`p`) which contains a banch of `text`.

Object signatures may differ based on the type of the html element they describe but they all share some functionality. For simplicity, we can say that all html elements conform the interface below:

```
interface Node {
  getClassNames(): List<String>
  getChilds(): List<Node>
  getParent(): Node
}
```

Now the way we represent markup to objects is straigh forward and is not the part of this article. What I am more interested in is this `getClassNames()` part which can be easily misunderstood. Every html element can have a `class` attribute where the user can put as many space separated classes as he wants. These classes are then accessible by this `getClassNames()` method.

### A css example
This is the most important method for us, as we developers, as it gives a binding point for styling and behaviour. This can be used in order to add css classes and define the style of the object. As an example, let's look at this markup:

```html
<div class="main article white">
  <h1>The header of the article</h1>
  <p>lorem ipsum</p>
</div>
```

In our pseudocode world, the result of the `mainArticleDiv.getClassNames()` whould be the list: `['main', 'article', 'white']`. But this list is not just another attribute of our div. It describes some of the div's functionality (styling) and therefor it looks more like metadata of the mainArticleDiv's interface rather than data of the interface. Since it is metadata, a list within our class is not the right way to describe them.

Let's make a pause here and go back to our computer science world and specifically to object oriented programming. There you can find the term [mixin][mixin] which is actually a way to describe a part of the functionality of an object. Assuming that the browser creates a mixin for every defined css class of ours and the fact that `Node` itself can be a mixin implemented by the browser, we can then describe our div with a class:

```
class MainArticle extends Node, CssMain, CssArticle, CssWhite {
  //Nothing to implement
}
```

and our `Node` interface becomes simpler: 

```
interface Node {
  getChilds(): List<Node>
  getParent(): Node
}
```

Now everything looks simpler. You have to still write the metadata in html as we just did, but at least now we can give a representation of and html object in an object oriented way.

### Javascript: behaviour mixins
Now that we can style our node with css mixins, what about adding some behaviour there? This is where javascript is comming. So let's say that we have a `<button/>` that we would like to use in order to show an alert to the user. Assuming that our button is also styled, we can describe this button with the following pseudo class:

```
class AlertMessageButton extends Node, CssButton, CssMessage, AlertMessageAction {
  //Nothing to implement
}
```

In html that would be something like the below:

```html
<button class="button message action-alert-message">Alert!</button>
```

and now all we have to do is to somehow implement this AlertMessageAction mixin. And that would be kinda easy:

```javascript
function alertMessage(msg) {
  window.alert(msg);
}
```

Now all that left is to bind that mixin to the elements's `action-alert-message` class. There is no standart way doing that but with jquery we can do it pretty easy:

```javascript
$('.action-alert-message').click(alertMessage);
```

But let's pimp our example a little bit more. As you see our mixin needs a `msg` to show. That means that our `AlertMessageButtton` should implement a `getAlertMessage` method or have an `alertMessage` field (we do not care about how we represent that on the class base). Well what about tweaking a little bit our html:

```html
<button class="button message action-alert-message" data-alert-message="Hi!">Alert!</button>
```

And now we are done. We have the `classname` of our object, the mixins that it is implementing and also some fields with data. Sounds like a proper instance to me.

One last thing to take care would be the actuall binding of the mixins to the element. The styling is something that our browser takes care of, but the behaviour is something that we should deal with. For that we have to use the hooks provided by our browser and just add our behaviour. With jQuery that would be something like:

```javascript
$(function (){ //on document load

  // bind our function to the click event of the .action-alert-message
  $(document).on('click', '.action-alert-message', function() {
    var msg = $(this).data('alert-message');
    alertMessage(msg);
  });
  
});
```

And I guess we are done! Do not try to hack stuff arround anymore. Use classes and mixins the way you should (even if they are kind of restrictive as they are in our html world).

### But why not to use `data` atributes as mixin names
Well, that kind of answer is kinda opiniated. Many frameworks are going that way, trying to let the user work with classes in a css central way. My answer to that is why not do the same with css? Why not use `data` attributes to style your elements?

As there is no straigh answer, let's say that I just like to have everything properly grouped. Therefor I use the `class` attribute to define the characteristics of an element and `data` attribute to give actual data to the element. It just looks much more logical to me, but still opiniated.


[dom]: http://en.wikipedia.org/wiki/Document_Object_Model
[composition]: http://en.wikipedia.org/wiki/Object_composition
[mixin]: http://en.wikipedia.org/wiki/Mixin

Refs
----
http://code.tutsplus.com/tutorials/object-oriented-css-what-how-and-why--net-6986
http://stackoverflow.com/questions/918380/abstract-classes-vs-interfaces-vs-mixins