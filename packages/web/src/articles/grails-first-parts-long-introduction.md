---
title: Grails, the first parts, a long introduction
author: valotas
date: 2009-12-13
template: article.jade
tags: java, groovy
---

Inspired by the title of Douglas Crockford book, "Javascript, the good parts" and having to write an introduction on grails as a course for some colleagues, I thought it would be good to just blog about grails and the first steps some one should take.

## Installation

Well the installation is not as easy as one double click but I can live with that and anyone that will have to deal with web application deployment should. That is because you will probably find harder things to deal with! The place to start is [grails download page](http://grails.org/Download) and the [official installation instructions](http://grails.org/Installation).

I assume that these steps are easy to follow. If not you should really reconsider your thoughts about the framework and web development. Not that you wouldn't be able to create a simple project but because you probably wouldn't understand a thing of what you were doing.

## First grails project

We start with a

```
$ grails create-app firstgrailsproject
$ cd firstgrailsproject
$ grails run-app
```

Yes! this is it! You've got your first web application ready!!! You don't believe me? Just try to visit http://localhost:8080/firstgrailsproject and see it yourself.

### The good parts

Ok! This is not what you had in mind but, it is a really big step. You have a servlet container with a lot of libraries and many other nice things ready waiting for you! That means that the framework not only provides you with a good development environment but also with a build system to use. Let's use it!

Before we start lets have some theory as a background. One thing you should care about is MVC. MVC is a pattern and is THE pattern when developing a web application and especially in java. We may not deal with java here directly but we do live in a java environment. What is MVC? MVC stands for Model View Control and lets have an example explaining it.

Lets say that a client needs something from the server. An xml, an html or whatever he may want. The server should be responsible for giving him what we want. This is where the developer (that should be you) have to do his job. Should check what the client needs and serve it. So you need a mechanism that will analyze what a client want retrieve the data and serve them in a form that the client asked for. This mechanism is called Controller.

We also mentioned the data. That is probably something we store in our database. Generally the data are never in a format that the client want so you give them in the format he wants. So the data is your Model and the format the View. We may have many views. For example an xml representation of the data or an html representation of the same data.

Grails is build with this pattern in mind. Ok this is another good thing! I also mention here data. Yes grails takes care of the this too! It provides you with a ready to use database with in the development environment. Another thing that you should not bother until you'll reach the production phase.

### The controller

As I said before, grails is build around MVC. So lets try to create a new Controller. By conversion all controllers have a name that ends with Controller and are placed inside grails-app/controllers directory. Let's create an echo controller.

```bash
$ grails create-controller com.valotas.firstgrailsproject.Echo
```

Don't forget that you are playing within a java environment and so, even if packages can be skipped, nobody will suggest such a thing. So lets have a look at our controller. Just open the generated groovy class/file with your favorite editor. That would be `grails-app/controllers/com/valotas/firstgrailsproject/EchoController.groovy`. As the name of the controller suggests, we would like to just return us a page writing the parameter phrase of our request. Lets edit our controller to do this exactly:

```
package com.valotas.firstgrailsproject

class EchoController {

  def index = { }

  def echophrase = {
    //if the request parameters has one named phrase use it's value
    //if not use the 'No phrase has been given' value for the phrase variable
    def phrase = params.phrase ? params.phrase : 'No phrase has been given'

    //return the model witch in our case is just a phrase
    return [message:phrase]
  }
}
```

This should do exactly what we want to. But before we continue we should also see how are we going to represent this data to the user

### The View

So we must take care of the layout/representation or whatever you would like to call it, of the data we have. In this case we will use an html page. As you can see we returned a model within the echophrase action (that's how we call it from now on) in the EchoController. This is just a map who's key is the string message and the value of it is the value of the phrase variable

Now lets create a simple page that will display this message. All we have to do is create a new gsp file under `grails-app/views/echo` folder named `echophrase.gsp`. The above will be just fine:

```html
<html>
  <head>
    <title>EchoController - echophrase</title>
    <meta name="layout" content="main" />
  </head>
  <body>
    <p>${message}</p>
  </body>
</html>
```

Now we can check if that works pointing our browser here: http://localhost:8080/firstgrailsproject/echo/echophrase?phrase=1,2,3 and here: http://localhost:8080/firstgrailsproject/echo/echophrase

### Controller - View glue

Well, how did that happen? Again grails wires many things together in order to have this kind of magic without doing anything. The whole concept is that every action can return a model witch is just a map. When this happens grails looks for a gsp page having the same name with our action inside the folder witch have the same name with our controller, except the Controller part. All the views must be placed inside the views folder. That is why we've placed the echophrase.gsp inside the echo folder in the views.

This is what we should if we have to return html pages. As we've said before a model may have more than one representation. So we could just return the model as xml or as json. Of course our main concern is html pages, so in this case we will stick to the gsps. Note the returning an xml or a json is hard to do! It is easier as you don't even have to write a gsp template!

## The Model: take our webapp to the next level: database

As we have seen in our example the model part is just a phrase a user passed to our controller as a parameter to it's request. This isn't the case of course in real web applications as in most cases we also have to do some interaction with the database. In order to do that we will also save the Echo phrase in the database and show the user a small history of the previous Echos.

To do that we must some how tell grails what we would like to save to the database. We define this using the so called domain classes. For our example we would like our echos to have a date they have been submitted and the actual phrase the user has been submitted. Domain classes are simple groovy classes inside the inside the `grails-app/domain` folder of our application. Let's create one manually (by creating an appropriate file) or letting grails doing it for us: `$ grails create-domain-class com.valotas.firstgrailsproject.Echo`. Now just edit the newly created file:

```groovy
package com.valotas.firstgrailsproject

class Echo {
  String phrase
  Date dateCreated

  static constraints = {
    phrase(size:1..100, blank:false)
  }
}
```

We defined what we would like our model to have. Note here that we would also like our phrases to have a size not bigger the 100 characters. We also defined that with in the constraints.

Now let's add an action to also save the echos, and except from the last posted one display the previous ones ordered by the dateCreated descended.

```groovy
def echoandlist = {
  //Get the list of the previous posted echos:
  def echolist = Echo.findAll([sort:'dateCreated', order:'desc'])

  def msg = 'Your echo has been saved' //The default message

  //Create a new echo and try to save it to the db
  def echo = new Echo(phrase:params.phrase)
  if (echo.hasErrors() || !echo.save()) msg = 'Could not save your echo'

  [message:msg, lastecho:echo, echolist:echolist]
}
```

One thing to to mention here is the hasErrors, save and findAll methods. These methods like many others are not defined to our class, but has been created thanks to groovy's AST. In other worlds grails provide us with a lot of utility methods. Three of these are the ones used here and I think that are self explained.

The last thing to do is to create our new view for this action. That will be something like the above

```html
<html>
  <head>
    <title>EchoController - echoandlist</title>
    <meta name="layout" content="main" />
  </head>
  <body>
    <div class="${lastecho.phrase ? 'message' : 'errors'}">
      ${message}
      <ul>
        <g:eachError bean="${lastecho}">
        <li><g:message error="${it}"/></li>
        </g:eachError>
      </ul>
    </div>

    <g:if test="${lastecho.phrase}">
    <h2>${lastecho.phrase}</h2>
    </g:if>

    <h3>Previous echos:</h3>
    <ul>
      <g:each var="echo" in="${echolist}">
      <li>${echo.phrase}</li>
      </g:each>
    </ul>
  </body>
</html>
```

Again, lets check if that works pointing our browser to the following links: http://localhost:8080/firstgrailsproject/echo/echoandlist?phrase=1,2,3, http://localhost:8080/firstgrailsproject/echo/echoandlist?phrase=foo, and: http://localhost:8080/firstgrailsproject/echo/echoandlist

Yes it was that simple. We now save our echo to an inmemory database witch we then query to take all the Echos we previously saved and show them the user.

## Productivity

As you can understand, grails not only provide us with utility methods within the domain class to validate it, but it also binds these errors to the domain class, and provide us with a custom tag to check the errors of a domain class within the view. Generally you can find a lot of utility methods and tags to use.

Except for those which make our life easier, grails provide us with a more exotic feature which pushed productivity to a next level. It is called scaffolding and it is the ability of grails to provide you with a simple yet very useful html based user interface. What exactly is this? If you are familiar with Domain Driven Development then this feature is your gateway!

### Domain Driven Development

Generally when you create a new web application, the first thing to do is to write down all the dynamic features of the site. All the things that will get changed by the end users and not by the developer. All these features describes the domain of your web application. So a good domain description can get a good web application. And here when we say good, we mean a site that will be usable by the end user.

In our case we wanted to keep a track of the posted Echo phrases. In case of a Bookstore webapp, the first thing that you want is to get a track of the books available at the bookstore. Of course a book has a title but it also has an Author witch could also have written more books. So in this example you should also have an Author domain class witch could have many Books (so Book should be another domain class) each of them could have many other authors.

### Scaffolding

As you can see, things are getting complicated. But not with scaffolding. Scaffolding help you get prototypes up and running by defining just the domain classes. Most of the tutorials of grails describes scaffolding. It something that shouldn't covered one more time but it is something the user should start playing only after knowing the basics witch I tried to describe here.

I've seen people who just get stack on how are they going to change something like the label of an input field of a scaffolded view. That's why I would suggest not to get experiment with scaffolding until you've understand the basic flow used to handle user's requests. So once you've done something the echo example you can start playing with scaffolding.

The idea behind scaffolding is that having domain described by your domain classes you will have to do some basic operations with them. These operations are Create Read Update Delete operations which are also known as CRUD operations. Things like that with todays tools are in most cases extremely easy to implement. But you still have to implement them and you have to do it for all your domain classes. A good programmer will consider having a helper class for this case but when you come to html form that things are getting more difficult. So why not we just have some kind of templates for such things that could easily get overwritten.

In that case all we need is the implementation of simple actions and its views. These actions are `list`, `show`, `delete`, `edit`, `update`, `create`, save and their views: `create.gsp`, `edit.gsp`, `list.gsp`, `show.gsp`. The views are not equal with the actions as some actions actually redirect the user to someother action. That is what scaffolding do. Generate boilerplate code that otherwise you should write. In my opinion this generated code is not written the best possible way and that is why I would suggest to use it only when prototyping a project.


