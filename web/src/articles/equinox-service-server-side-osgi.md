---
title: Server side OSGI with Equinox
author: valotas
date: 2009-09-26
template: article.jade
---

Well this is not about OSGi itself but using it at the server side. So assuming that you have some osgi bundle you want to run them on a server. There is many osgi frameworks that you can use but here we are about to use Equinox.

## Stand alone Equinox

We don't have to say that if you are running eclipse you are running equinox. But how should you run it stand alone? Well all you need is the main jar file witch would look like `org.eclipse.osgi_[version].jar` and can be found under the plugins folder of your Eclipse installation. If you find it just run it:

```sh
java -jar org.eclipse.osgi_[version].jar -console
```

*Update*: If you can't find it or you thing that you may be outdated just grab the latest one from [Equinox homepage][equinox]

More information on that can be found searching for stand alone equinox or headless equinox. A quick start is also available here at the [project's homepage][equinox-quickstart]

## Equinox as a service

Well I'm ok with my bundles! How can I put them on the server side? We need an enviroment to put them and the most appropriate one would be a windows service or a linux deamon!

I couldn't find any solutions ready to go. So I had to create one! [Java Service Wrapper][java-service-wrapper] to the rescue.

There is some integration methods that can be used with the service wrapper. I choosed the easiest one and I'll describe it here step by step:

*Step 1*: Download and unzip the service wrapper

*Step 2*: Place in the lib folder the equinox jar

*Step 3*: Edit the wrapper configuration file. This is the most importatant part. Above are the common settings that can be used

```
wrapper.java.mainclass=org.tanukisoftware.wrapper.WrapperSimpleApp

wrapper.java.classpath.1=../lib/wrappertest.jar
wrapper.java.classpath.2=../lib/wrapper.jar
wrapper.java.classpath.3=../lib/org.eclipse.osgi_3.5.0.v20090520.jar

wrapper.java.additional.1=-Declipse.ignoreApp=true
wrapper.java.additional.2=-Dosgi.noShutdown=true
wrapper.java.additional.3=-Dosgi.requiredJavaVersion=1.5
wrapper.java.additional.4=-Dosgi.compatibility.bootdelegation=true
wrapper.java.additional.5=-Djava.util.logging.config.file=../conf/logging.properties
wrapper.java.additional.6=-Dfile.encoding=UTF-8

wrapper.app.parameter.1=org.eclipse.core.runtime.adaptor.EclipseStarter
wrapper.app.parameter.2=-console
wrapper.app.parameter.3=OSGI_CONSOLE_PORT

wrapper.console.title=Eclipse Server
wrapper.name=equinoxservice
wrapper.displayname=Equinox Server
wrapper.description=Equinox Server
```

So what we've done? The java main class is the wrapper's helper class that will actually call our main class. That's why we also added to the classpath our equinox jar.

Now we also need to call the equinox jar with some java properties. This is done with the `wrapper.java.additional` properties. The four first ones should be used in order for our osgi runtime to work properly

Now after that we must provide the wrapper class with our main class and possible parameters. This is done with the wrapper.app.parameter properties, but what to put there? Looking at our equinox manifest file we get the main class: `org.eclipse.core.runtime.adaptor.EclipseStarter` we we also added the `-console port_num` parameters in order to be able to telnet to port_num and install or uninstall bundles

Now all the other properties has to do with with the service name. You can ofcourse give what ever values you want!

*Step 4*: At last just install the service calling the install script that can be found in the bin folder of the wrapper.

## Referencies

* http://wrapper.tanukisoftware.org/doc/english/integrate-simple-win.html
* http://www.eclipsezone.com/eclipse/forums/t112152.html
* http://mauszeig.wordpress.com/2007/06/10/equinox-as-a-service/


[equinox]: http://download.eclipse.org/equinox/
[equinox-quickstart]: http://www.eclipse.org/equinox/documents/quickstart.php
[java-service-wrapper]: http://wrapper.tanukisoftware.org/doc/english/download.jsp

