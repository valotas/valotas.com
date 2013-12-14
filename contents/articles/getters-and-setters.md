---
title: Why do we need getters and setters
date: 2013-12-14
---


Recently I had a look at the dartlang and that reminded me of the getters and setters mechanism that someone has with C#. So let's have a look at them.

## Where to use them
Well, the idea in OO languages is very simple. You have a class and you have a property:

```
class Person {
    String name = null;
}
```

You start using this property in other classes:

```
var george = new Person();
george.name = "George";
assert george.name === "George";
```

Now you need to change your class. The name property is not enough anymore but you need to define a `firstname` and `lastname`. In order to provide backwards compatibility you do not want to just remove the name property anymore, or at least do not allow to update it but give something back when someone is calling it. It would be cool for example to have the above:

```
var george = new Person();
george.firstname = "George";
george.lastname = "Valotasios";
assert george.name === "George Valotasios"
```

Well, something like that is a no-go for java, but there are languages (Scala, C# and Dart to name a few) that allow you to do that. I do not really care on the syntax of the feature nut let's take dart's syntax as an example and provide a solution to our problem:

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

## Getters and setters should not be regular method
Two rules of good getters and setters:

- they should be fast
- they should be side-effect free

These two rules tells you for example that you should not do there any IO stuff or spawning new threads. Still these two rules has been violated even by framework developers who's exeprtise in a language should not have been questionable.

As I can not question their expertise, I can only assume that it easy to just abuse this feature (or gennerally a getter or setter method in a language that do not provide it as a core feuture) by mistake. But if that is the case, there should be some precations against. Static analysis tools have been around for a while so, for sure they can help us there.

It would be also cooler if the compiler of a language would be able to do the analysis for you as part of the compilation. In that case it makes sense to help the compiler and yourself with a special definition of the feature:

- The compiler will know that it should be stricter with the content of such a method definition
- You will know when and how to use getters and setters
- Prevent newbies from misusing them

At the end, I do not see the need for a syntactic sugar for a method definitions, if that syntactic sugar only forces assumptions about the underlying execution.