---
title: Multiple tomcat 6 services on windows
date: 2009-09-07
---

Not that there isn't any documentation out there, but just for helping myself, I need a place where to put all the steps needed for an installation of multiple instances of tomcats on a windows machine. Lets start...

## Downloading

[tomcat.apache.org](http://tomcat.apache.org) should be the place to start. At the time of this writing the latest tomcat available is 6.0.20. You can find the download page [here](http://http//tomcat.apache.org/download-60.cgi/). One thing to remember: *don't download the windows installer*. If you want to install many instances of tomcat you should download the zipped version.

## Unzip and go

Well if you unzip the downloaded file somewhere (lets say `TOMCAT_HOME`) you have a tomcat ready to start serving your webapps but not as a windows service. In order to do that you must use the `service.bat` script provided in `TOMCAT_HOME\bin` directory. When you run it you will have the tomcat installed as a service with name Tomcat6 but don't do that yet.

## Custom service name

Now what we want is to have tomcat installed as service with a custom name, lets say tomcat6020. What you do is

```
cd TOMCAT_HOME\bin\
service.bat install tomcat6020
```

And you are done! You have tomcat installed as a service with name tomcat6020. *All you have to do now is repeat these steps for each tomcat instance you want to run on your machine*. The above steps can be done separately, once for all the tomcat instances

## Configuring the service

We may have our service ready but this doesn't mean that it is secured nor that it can work properly. It is a good practice to create a special user account on the machine that will run the service with appropriate permissions.

### Create a user

For adding a user just go to `Administrative Tools > Computer Management > Local Users and Groups`. It is good for the newly created user not to be a member of any Groups (yes not even the Users one).

### Give user access to tomcat and java

You then must add full access for the user you just creates to tomcat's directory. This is done by right clicking on the directory, going to the Security tab and adding the new user with full access to the directory

You then must give the user access the java executables. This is done the same way you gave him access to the tomcat dirs except that you can give him only read and execute access to the `JAVA_HOME` dir.

### Let the user log on as service

You then must adjust the newly created account settings, in order to do that go to `Administrative Tools > Local Security Policy > Local Policies > User Right Assignments` and add the user to the following rules:

* Deny Logon Locally
* Deny Access to This Computer from the Network
* Deny Logon As a Batch Job
* Deny Logon Through Terminal Services
* Log on as a Service

Actually the most important rule is the last one. You can't skip this one as the service will not be able to start otherwise

All the other rules is a step further securing our machine and ofcourse will not cost anything using them!

### Update: Installing on a win 64bit machine

In order for the tomcat service to start, apache provides a java service wrapper witch is actually the `tomcat6.exe` executable. This file will not work under a 64bit windows machine. You have to replace it with one compiled to work with 64bit windows. You can get a precompiled one for the current version of tomcat, at tomcat's svn: http://svn.apache.org/repos/asf/tomcat/tc6.0.x/tags/TOMCAT_6_0_20/res/procrun/amd64/tomcat6.exe

## Referencies

* http://tomcat.apache.org/tomcat-6.0-doc/setup.html
* http://tomcat.apache.org/tomcat-6.0-doc/windows-service-howto.html

