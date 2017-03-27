---
title: Apache Tomcat advanced startup configurations
date: 2013-01-08 14:21
---

I am always searching for the last tomcat configuration every time I need to
deploy a new one, so, here is what I use.

## Common tomcat configuration

Tomcat comes with some configuration tools. A command line one and a Window
based one (tomcat6.exe and tomcat6w.exe respectively). Lets use the GUI. One
thing to remember is that the executable should have the same basename with
your service name. So we rename the `tomcat6w.exe` file to `tomcat6020w.exe`,
and use it.

One other thing to mention is that it's better not to rename the tomcat6.exe
file as it will be used in order for the service to start up.

### Java Options
What are the most common java options in my opinion:

```
-Dcatalina.home=TOMCAT_HOME
-Dcatalina.base=TOMCAT_HOME
-Djava.endorsed.dirs=TOMCAT_HOME\common\endorsed
-Djava.io.tmpdir=TOMCAT_HOME\temp
-Dfile.encoding=UTF-8
-Djava.util.logging.manager=org.apache.juli.ClassLoaderLogManager
-Djava.util.logging.config.file=TOMCAT_HOME\conf\logging.properties
-Dcatalina.logbase=C:\SOME\PATH\FOR\LOGS
-XX:+UseConcMarkSweepGC
-XX:+CMSClassUnloadingEnabled
-XX:+CMSPermGenSweepingEnabled
-XX:MaxPermSize=128m
```

I should add an explanation for each of the properties but it is not the time
yet
