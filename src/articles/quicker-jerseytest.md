---
title: Quicker JerseyTest
author: valotas
date: 2012-04-09
template: article.jade
---

That is a quick one. These days I was playing around with [Jersey][jersey] in order to create a rest web service. The thing is that I would like to test what I create. The good thing is that Jersey provides a testing framework. But... 

## Jersey test setup

As the project I was working on was a mavenized one, all I had to do was to add the dependency:

```xml
<dependency>
  <groupId>com.sun.jersey.jersey-test-framework</groupId>
  <artifactId>jersey-test-framework-grizzly2</artifactId>
  <version>${jersey.version}</version>
  <scope>test</scope>
</dependency>
```

As a quick reminder, you can not only use the grizzly web container with the jersey framework, but as I needed some a way to test the actual http api, I went that way initializing everything I would have initialize at a web container with an in memory database.

So after that you can extend the `com.sun.jersey.test.framework.JerseyTest` class and use it with jUnit.

## The problem
The problem is that the JesreyTest initializes the webcontainer before each test and shut it down after that. That means that the procedure became real slow and I could not run parallel tests as the testing framework would try to initialize the web container twice causing an exception regarding the address that is already in use.

## The solution
After reading the JerseyTest source code I ended up at the setUp method:

```java
@Before
public void setUp() throws Exception {
  tc.start();
}
```

but as tc was the `com.sun.jersey.test.framework.spi.container.TestContainer` class that is getting initialized at the contstractor of the JerseyTest, there was not anything that I could do there!.

As I used the JerseyTest(AppDescriptor ad) you can see here:

```java
public JerseyTest(AppDescriptor ad) throws TestContainerException {
  this.tc = getContainer(ad, getTestContainerFactory());
  this.client = getClient(tc, ad);
}
```

I could change two things. Either the `getContainer` method or the `getTestContainerFactory`. From these two, only the second one was protected and could let me do something like that.

### One TestContainer per AppDescriptor

So what I needed was a custom TestContainerFactory that would cache the resulted TestContainer per AppDescriptor. Something like:

<script src="https://gist.github.com/valotas/2344641.js?file=OnePerAppDescriptorTestContainerFactory.java"></script>

Now I can wrap any other TestContainerFactory and only use it if I do not have any other TestContainer ready for a given AppDescriptor. The last problem would be a shutdown hook. As I'm using TestNG the `@BeforeSuite` with `@AfterSuite` annotations worked just fine:

<script src="https://gist.github.com/valotas/2344641.js?file=BetterJerseyTest.java"></script>

The jUnit users may have a look [here][junit-before-after-hook] to check how they can implement a shutdown hook or just don't at all :-).

[jersey]: http://jersey.java.net/
[junit-before-after-hook]: http://stackoverflow.com/questions/82949/before-and-after-suite-execution-hook-in-junit-4-x
