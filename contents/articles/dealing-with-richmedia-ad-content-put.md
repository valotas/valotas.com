---
title: Dealing with Richmedia ad content
author: valotas
date: 2009-11-15
template: article.jade
---

Long story short: *Always put your javascript at the bottom of the html*. But why?

## What is the deal here?

When you have to deal with richmedia ad content many thing could slow you down. The basic problem here is that the richmedia ad content needs javascript in order to implement their "rich" part! The bad thing here is that in order to have a better page rendering performance you have to put the javascript stuff at the bottom of you html page. Why? Well [this](http://developer.yahoo.com/performance/rules.html#js_bottom) should give you something to start with and google searching well get you in to it!

## Putting richmedia scripts at the bottom

Now if we all agree that we must do that lets try to find some solutions. The most easy way to accomplish this is with css. Of course rewriting the html so that all the banners could be at the bottom is not as easy as it sounds but it will not cause any problems to the richmedia delivery.

Unfortunately css side (html rewriting) solution is not always that easy and most times needs some javascript help especially when we have ad slots that doesn't have an absolute position. For example a slot at the end of some text dynamically inserted by your back end.

## Use javascript to cure javascript problems

Instead of trying to use javascript to cure the positioning of some banners we could just use it to reposition all of them. So this is another solution to our problem.

The idea of this solution is to have placeholders where we would like the ad slots to appear. These placeholders will then help as compute the position of the actual slot (lets call them bannerholder) that will be put at the bottom of the html, possibly in a hidden block.

### jQuery to the resque

I'm personaly a big fun of jQuery and so I wrote a small plugin to do just that

```javascript
/**
 * We have banner placeholders and the actual banners loaded at the end of
 * the page. The banner placeholders have an id of type placeholder__[banner_id]
 * and the banners are placed in a div with id banner__[banner_id] witch we will
 * call bannerholder
 */
$.fn.attachBanners = function(o) {
  o = $.extend({
    attachRetry: 200, //Retry to attach the bannerholder to placeholder in 200millis
    syncInterval: 400 //Sync the positions of the bannerholder and placeholder every 400millis
  }, o ? o : {});

  return this.each(function() {
    var $placeholder = $(this),
      id = this.id.replace('placeholder__', ''),
      $bannerholder = $('#banner__' + id),
      retry = false, //If something goes wrong just retry after the attachRetry period of time
      bannerholderWidth,
      bannerholderHeight;

    if ($bannerholder.lenght > 0) {
      /*
       * We compute the width and height of the bannerholder. They are both equal to zero we
       * will not do anything and retry as the DOM of the bannerholder might not be ready yet
       */
      bannerholderWidth = $bannerholder.width();
      bannerholderHeight = $bannerholder.height();
      if (bannerholderWidth !== 0 && bannerholderHeight !== 0) {
        $placeholder
          .attr('class', function() { //Add to the placeholder the classes of the bannerholder
            return this.className + ' ' + $bannerholder.attr('class'); 
          })
          .width(bannerholderWidth)
          .height(bannerholderHeight);
        $bannerholder
          .css('position', 'absolute')
          .css($placeholder.offset('px'));
    
        //We now make sure that the banner and the placeholder are always in sync
        setInterval(function() {
          $bannerholder.css($placeholder.offset('px'));
        }, o.syncInterval);
      }
      else {
        retry = true;
      }
    }
    else {
      //In this case we assume that the DOM is not ready yet and we have to retry
      retry = true;
    }

    if (retry) {
      setTimeout(function() {
        $placeholder.attachBanners();
      }, o.attachRetry);
    }
  });
};

/**
 * Just a plugin to compute the offset of an element
 */
$.fn.offset = function(o) {
  var what = this[0],
    offset_left = what.offsetLeft,
    offset_top = what.offsetTop,
    parentEl = what.offsetParent;
 
  while (parentEl !== null){
    offset_left += parentEl.offsetLeft;
    offset_top += parentEl.offsetTop;
    parentEl = parentEl.offsetParent;
  }
 
  if (o && o == 'px') {
    offset_left += 'px';
    offset_top += 'px';
  }
  return {left: offset_left, top: offset_top};
};
```

Now assuming that you have a slot with id myslot, all you have to do is ad a div with id `placeholder__myslot` where you would like your slot to be displayed and a div with id `banner__myslot` with your rich media markup inside. Then a `$(#placeholder__myslot).attachBanners()` will do the positioning for you no matter where you've got your `div#banner__myslot` placed!

Update: Reviewing the code (as it must have been over a year since I first wrote it), I can say that the offset function is a little bit useless as jQuery provide us with a function witch does this this exactly! No need to rewrite stuff!



