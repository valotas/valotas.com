---
title: Why do we need getters and setters ?
date: 2013-12-14
---


Recently I [had a look at the Dart programming language][thoughts-on-dart] and that reminded me of the getters and setters mechanism that someone has with [C#][csharp]. So let's have a look at them.

[thoughts-on-dart]: http://valotas.com/dart-language/
[csharp]: http://en.wikipedia.org/wiki/C_Sharp_(programming_language)

## Where we use them
Well, the idea in OO languages is very simple. You have a class and you have a property, a field or whatever piece of data that you want to access:

```
class Person {
    String name = null;
}
```

You start using this property in other classes:

```
var george = new Person();
george.name = "George";
assert george.name === "George"; //true
```

Now you need to change your class a little bit. The name property is not enough anymore but you need to define a `firstname` and `lastname`. In order to provide backwards compatibility you do not want to just remove the name property. That is straight forward, just return something like `firstname username` when someone is trying to access the `name` field. For simplicity we also do not allow any direct updates of the `name` field. "Speaking" in pseudo code, it would be cool to have the above:

```
var george = new Person();
george.firstname = "George";
george.lastname = "Valotasios";
assert george.name === "George Valotasios" //true
```

Well, something like that is a no-go for java, but there are languages (Scala, C# and Dart to name a few) that allow you to do that. I do not really care about the syntax of the feature but let's take dart's syntax as an example and provide a solution to our problem:

```
class Person {
    String firstname
    String lastname
    
    Person(this.firstname, this.lastname);
    
    String get name => "$firstname $lastname"
}

var george = new Person("George", "Valotasios");
asser george.name === "George Valotasios"
```

## Just anonther method declaration
So, what is happening now? Well the vm knows that the class Person does not have the field named `name` but there is a special method that can be called whenever a someone tries to access the `Person`'s `name` field.

This is actually what we are forced to do with Java where no such feature exists. The normal way of dealing with data objects in Java is to have only private fields and provide methods named after the field with a `get` or `set` prefix. So in java the same class would look like:

```java
class Person {
    private String firstname;
    private String lastname;
    
    public Person(String firstname, String lastname) {
        this.firstname = firstname;
        this.lastname = lastname;
    }
    
    public getName() {
        return firstname + " " + lastname;
    }
}
```

and making sure that you followed the rule of having private fields, you only end up having to always write some more characters for accessing fields: `person.getName()` instead of `persons.name`.

All in all, till now getters and setters looks like "special" methods. They either have a special name or a special syntax. That speciallity allows you to make some assumptions about what is going to happen. But should it be that way?

## Getters and setters should not be regular methods
Getters and setters in general should describe a property of a class. That said they should just update or return that property value. So in theory no computation should happen in then, they should be fast and of they should be side-effect free. For simplicity, lets change a little bit the definition of them and apply only two rules:

- they should be fast
- they should have any side-effect other than updating the underlying property (in the case of a setter)

These two rules are a simplification of the [principle of least surprise][pols] and tells you for example that you should not do there any IO stuff or spawn new threads or even update any fields other that the one that the name of the setter defines. Still these two rules has been violated even by developers who's exeprtise in a language is not questionable.

As I can not question their expertise, I can only assume that it easy to just abuse this feature by mistake. But if that is the case, there should at least be some precations. Static analysis tools have been around for a while, so for sure they can help us there.

It would be also cooler if the compiler of a language would be able to do the analysis for you as part of the compilation. In that case it makes sense to help the compiler and yourself with a special definition of the feature:

- The compiler will know that it should be stricter with the content of such a method definition
- You will know when and how to use getters and setters
- Prevent newbies from misusing them

At the end, I do not see the need for a syntactic sugar for a method definitions, if that syntactic sugar only forces assumptions about the underlying execution.

# Do you really need a getter or a setter?
Having said that and assuming that our code provide good implementations of getters and setters, there is still the question of their need. 

A simple mistake that I used to do for example was to just let my IDE create them for me. I ended up having for every class stuff that never needed. In other words, before you use the stuff of your IDE, just make yourself a question: "does a field represent an internal state of your class?". If so, why do you need to provide a getter or a setter for this?. Even if you have a clear yes for a getter (it could be), question again yourself about the setter. Do you always need to update a property of a class? If not why to provide a setter for it?

Not all of our object should be [`DAO`][dao]s and with that exception I hardly have to provide any setters for other object. Apparently even the use of getters is kind of limited outside the scope of a `DAO`.

[dartlang]: https://www.dartlang.org/
[pols]: http://en.wikipedia.org/wiki/Principle_of_least_astonishment
[dao]: http://en.wikipedia.org/wiki/Data_access_object
