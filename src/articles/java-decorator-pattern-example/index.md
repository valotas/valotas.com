---
title: Java Decorator pattern example
date: 2011-09-11
---

Ok what the hell is the decorator pattern? Why do I need it?

## Theory
I can not say that I am good explaining theory. I just read it and try to apply it where possible! After all practice and theory, theoretically are exact the same! So If you are intrested in theory, I thing that [this article at Wikipedia][1] can explain pretty well what it is all about. But if you are like me I do not know if you will remember what exactly is and where to use it if you haven't used it at least once!

## A real example using the Decorator pattern
The funny thing is that I've been using this pattern a lot (even if I did not realize it from the first moment) and I'm pretty sure that many of you have. Where? Within every web application that uses the servlet directly. The scenario is that I want to make sure that when I use the `getRemoteAddr()` of a request I should always first check if there is an `X-Forwarded-For` header within the request and if so use that ip address. The solution is a custom `HttpServletRequest`. The servlet api gives us the tool in order not to have to write a lot of boilerplate code which is called `HttpServletRequestWrapper`. The class should look like the one below.

<script src="https://gist.github.com/valotas/1209461.js?file=XFFAwareRequest.java"></script>

If you are also intrested in how to actually use it,that is with a Servlet filter:

<script src="https://gist.github.com/valotas/1209461.js?file=HttpServletRequestDecoratorFilter.java"></script>

Cool, but where is the power of decoration? We just wrapped a class providing some more logic to it. Well, the other day you have the request to prevent your site from [xss attacks][xssattack]. A way to do that is to filter the request parameters and strip or escape bad characters or group of characters. Of cource we can just add some functionality to our existing class (XFFAwareRequest) and also rename it to reflect the new functionality added. This solution thought breaks the principle of [separation of concerns][soc]. What we do then? Easy, create another decorator to provide the new functionality (and only that) overriding the getParameter method and replacing or removing the bad stuff.

<script src="https://gist.github.com/valotas/1209461.js?file=XSSAwareReq.java"></script>

Then all you have to do is to decorate a little bit more the first HttpServletRequest which is as easy as adding the line `req = new XSSAwaareReq(req)` before the `return new XFFAwareReq(req);` one letting the XFFAwareRequest untouchable and not breaking for example existing tests! Now you know that you've used the decorator pattern with in your web apps!

[1]: http://en.wikipedia.org/wiki/Decorator_pattern
[xssattack]: http://en.wikipedia.org/wiki/Cross-site_scripting
[soc]: http://en.wikipedia.org/wiki/Separation_of_concerns
