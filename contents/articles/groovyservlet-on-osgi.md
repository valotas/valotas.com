---
title: GroovyServlet on the OSGI
author: valotas
date: 2009-11-15
template: article.jade
---

After having [static resources get served right with Jetty within an OSGI enviroment](/jetty-defaultservlet-on-osgi/) you may want to be able to use groovy and more specific some groovlets

More or less the problem is the one that has been described at a [previous post](/jetty-defaultservlet-on-osgi/).Once again all we have to do is give some more "space" to the `groovy.servlet.GroovyServlet` to look for our groovlets

## The code

```java
package com.valotas.osgi.jetty.servlet;


import java.net.URLConnection;
import java.util.logging.Level;
import java.util.logging.Logger;

import groovy.servlet.GroovyServlet;
import groovy.util.ResourceException;


public class OsgiGroovyServlet extends GroovyServlet {
  private static final long serialVersionUID = 4017944232557220667L;
  private static final Logger logger = Logger.getLogger(OsgiGroovyServlet.class.getName());
  private static final String resourcesPrefix = "/webapp";


  @Override
  public URLConnection getResourceConnection(String path) throws ResourceException {
    if (logger.isLoggable(Level.FINER)) logger.log(Level.FINER, String.format("Trying to serve resource %s", path));
    try {
      return super.getResourceConnection(path);
    }
    catch (ResourceException e) {
      return getResourceConnectionFromOSGI(path);
    }
  }


  private URLConnection getResourceConnectionFromOSGI(String path) throws ResourceException {
    String actualpath = path;
    if (!actualpath.startsWith(resourcesPrefix)) {
      actualpath = resourcesPrefix + path;
    }

    if (logger.isLoggable(Level.FINER)) logger.log(Level.FINER, String.format("Trying to serve resourse %s (%s) from our osgi container", actualpath, path));

    try {
      return this.getClass().getResource(actualpath).openConnection();
    }
    catch (Exception e) {
      throw new ResourceException(String.format("Script %s couldn't be found", path), e);
    }
  }
}
```

So all we do is to extend the GroovyServlet and override it's `getResourceConnection` in such a way that it will do a final try to find the groovlet from within the osgi bundle. That is what we implement with the `getResourceConnectionFromOsgi` method.

Caution: We assume that we pack all our resources and so our groovlets with in the webapp directory witch we provide with the resourcesPrefix variable. Of course we could change the servlet to get it's value with a servlet init parameter.

