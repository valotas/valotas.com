---
title: Mail Session on tomcat and jetty via jndi
author: valotas
date: 2010-05-01
template: article.jade
---

It's been a while since I last bloged but here I am again with something that took me a little bit in order to figure out how exactly should someone define a mail Session at the config files of jetty and tomcat. So the problem here is to define a mail session with name `mail/Session` using the host `my.mail.server.com` as mail server with username `mailserver_username` and password `mypassword`.

## Show me the code!

Actually in both cases I found documentation on how to define the mail session but didn't find out how to define the authentication part of it. Let's jump to the solution

### Jetty

Jetty has the `jetty-env.xml` file you can use to define resources of the web application. So with in the Configure xml element we add the following

```xml
<New id="mailSessionId" class="org.eclipse.jetty.plus.jndi.Resource">
  <Arg>mail/Session</Arg>
    <Arg>
      <New class="org.eclipse.jetty.jndi.factories.MailSessionReference">
        <Set name="user">mailserver_username</Set>
        <Set name="password">mypassword</Set>
        <Set name="properties">
          <New class="java.util.Properties">
            <Put name="mail.host">my.mail.server.com</Put>
            <Put name="mail.debug">true</Put>
            <Put name="mail.smtp.auth">true</Put>
          </New>
        </Set>
      </New>
    </Arg>
</New>
```

### Tomcat

Just like jetty, tomcat has its own file to put configuration about possible references. That is `context.xml` where we should put the following with in the Context xml element:

```xml
<Resource name="mail/Session" auth="Container"
  type="javax.mail.Session"
  mail.smtp.host="my.mail.server.com"
  mail.debug="false"
  mail.smtp.auth="true"
  mail.user="mailserver_username"
  password="mypassword" />
```

## Note

In both cases I had to dig more than the usual as I din't find anywhere an as is solution. Things became a little bit clear when start reading the javadoc of its container. For jetty things was a little bit better as you only need the javadoc and then you can figure out the configuration (very nice xml based way to deal with classes but not as short as a configuration should be).

For tomcat the configuration is much more smaller but in order to see how to define the host and the username to use I had to have a look at tomcat source code. I mean why there isn't any full example at the java doc on the attributes a user can use in order for the [org.apache.naming.factory.MailSessionFactory](http://tomcat.apache.org/tomcat-6.0-doc/api/org/apache/naming/factory/MailSessionFactory.html) to create a `javax.mail.Session` using an `javax.mail.Authenticator` with given username and password.

## Getting the session

With in the web application we get the session looking for the given name form an `InitialContext`. The following snipet will do the trick

```java
Context initial = new InitialContext();
Session session = (Session) initial.lookup("java:/comp/env/mail/Session");
```

