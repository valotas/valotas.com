---
title: Jetty DefaultServlet on the osgi
author: valotas
date: 2009-10-11
template: article.jade
---

Basically when you work on the osgi and want to use a resource, things are not that easy. What I wanted to do is use Jetty embedded on an Osgi container and use it with a simple servlet and a resource.

## Embed jetty

A good resource on how to embed the Jetty container can be found at [this blog post][embed-jetty-osgi]. After embedding jetty the most common thing to do in order to test it is to write a simple servlet and let jetty use it. More on how to embed jetty on the osgi on a future post.

## DefaultServlet

Assuming that you have the container embedded and work right with a simple servlet you would propably like to also serve some actual html pages or images witch is what we used to call static resources. These resources can be served by the container thanks to a specific jetty's servlet. That is `org.mortbay.jetty.servlet.DefaultServlet`.

So if you just try to serve some static content from embedded jetty you will probably wont be able to accomplish that. The reason is that the resources will be within your bundle jar. So in order to overcome this you must tell jetty where to look for the resources

This can be accomplish exending jetty's DefaultServlet:

```java
package com.valotas.osgi.jetty.OsgiDefaultServlet;


import java.io.IOException;
import java.net.URL;

import org.mortbay.jetty.servlet.DefaultServlet;
import org.mortbay.resource.Resource;

/**
 * This is the default servlet that handles the the resources
 * that are inside an osgi bundle under the /webapp directory
 * 
 * It extends DefaultServlet and should be used instead of it with 
 * embedded jetty inside an osgi environment
 * 
 *
 */
public class OsgiDefaultServlet extends DefaultServlet {
  private static final long serialVersionUID = -1951721992652851719L;
  private static final String resourcesPrefix = "/webapp";

  @Override
  public Resource getResource(String resourceString) {
    if (!resourceString.startsWith(resourcesPrefix)) {
      resourceString = resourcesPrefix + resourceString;
    }

    URL url = this.getClass().getResource(resourceString);
    Resource resource = tryCreateResource(url);
    return resource;
  }

  private Resource tryCreateResource(URL url) {
    Resource resource = null;
    try {
      resource = Resource.newResource(url);
    }
    catch (IOException e) {
      //do nothing!
    }

    return resource;
  }
}
```

The above will work if you will package your static resources within webapp package (or folder!). Of course you can change that!

Now what we just did is to override the `getResource` resource method of the `DefaultServlet` class in order to force jetty look for them within the webapp package.

## References

* [Embedding Jetty in OSGi][jetty-and-osgi]
* [Embedding Jetty in OSGi (osgi felix sample step 3)][emded-jetty-osgi]

[embed-jetty-osgi]: http://www.gridshore.nl/2008/02/15/embedding-jetty-in-osgi-osgi-felix-sample-step-3/
[jetty-and-osgi]: http://blogs.webtide.com/janb/entry/jetty_and_osgi
