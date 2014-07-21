---
title: Get the output of a jsp or servlet response as String
author: valotas
date: 2011-09-25
template: article.jade
---
Well, at the first glance the answer to this problem would be to just make an http request to the jsp file and get the output! 

## The problem
In fact, many libraries can help you do that and you also have java's [HttpUrlConnection][httpurlconn]. This solution will work in most cases. At least it worked for me but I was never really happy with it. The jsp is within my webapp, why should I make an http connection to my webapp to get the computed output of the jsp? Not to mention that I had to pass all of my parameters again as my jsp could not use the attributes within my current request scope.

Thanks God, the HttpUrlConnection solution stopped working after changing the network topology of the webapp. So instead of trying to tweak this solution I just thought of the better one as at that point I had the knowledge I needed! 

## The goal
So, the goal is to have the web container generate the output and instead of writing to the servlet output, write it to "something else" I had access to. Cool, how to do that? After a little reading you can find out that the container writes the output of the jsp using the writer of `HttpServletResponse.getWriter()` just like you do when you want to directly write to the output of you response. That happens because after all the jsp's are translated into servlets, get compiled and used as plain servlets.

## The solution
Applying some OO patterns, the problem seems strait forward. First of all we need a custom HttpServletResponse where we would provide our custom writer when someone uses the getWriter() method. As for the writer, we need one that we can the access in order to get it's content. Again java provides us with this tool and it's called [CharArrayWriter][chararr]. Finally we can use the [HttpServletRequestWrapper][httpwrapper] to decorate our response!

<script src="https://gist.github.com/1240545.js?file=CharArrayWriterResponse.java"></script>

## The wiring
Ok done! Now how do I use it? Well, let's say that you want to get the output of a jsp file in order to use it for the body of an html email (that was my case). Then you should wrap the actual `HttpServletResponse` with your's and let the servlet container use that one. There is a servlet that does exactly that:

<script src="https://gist.github.com/1240545.js?file=ServletUsingCustomResponse.java"></script>

[httpurlconn]: http://download.oracle.com/javase/1.4.2/docs/api/java/net/HttpURLConnection.html
[chararr]: http://download.oracle.com/javase/1.4.2/docs/api/java/io/CharArrayWriter.html
[httpwrapper]: http://download.oracle.com/javaee/1.3/api/javax/servlet/http/HttpServletResponseWrapper.html
