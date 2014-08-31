---
title: Object oriented html
date: ???
published: false
---

There is quite a buzz nowadays (2014) for functional programming and so we all try to move our thinking in a more functional way. Still, the object oriented approach seems to be the easiest way to understand and so to programm at the end. The object oriented programming can be applied to any structural schemantic. One of that structurs though that we tend to forget is `html`.

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

[dom]: http://en.wikipedia.org/wiki/Document_Object_Model
[composition]: http://en.wikipedia.org/wiki/Object_composition
[mixin]: http://en.wikipedia.org/wiki/Mixin