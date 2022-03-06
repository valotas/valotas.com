---
title: Eclipse on Linux, make it look good
author: valotas
date: 2010-02-24
template: article.jade
---

I really do not know why such an issue hasn't been fixed. I do not care who is responsible for the uglyness of Eclipse on Linux but unfortunately this is a fact. After some search I found a solution.

## Let me know!

That is to change the `.gtk2rc` (or something like that) file on your home directory to something like...

```
style "gtkcompact" {
 font_name="Sans 8"
 GtkButton::default_border={0,0,0,0}
 GtkButton::default_outside_border={0,0,0,0}
 GtkButtonBox::child_min_width=0
 GtkButtonBox::child_min_heigth=0
 GtkButtonBox::child_internal_pad_x=0
 GtkButtonBox::child_internal_pad_y=0
 GtkMenu::vertical-padding=1
 GtkMenuBar::internal_padding=0
 GtkMenuItem::horizontal_padding=4
 GtkToolbar::internal-padding=0
 GtkToolbar::space-size=0
 GtkOptionMenu::indicator_size=0
 GtkOptionMenu::indicator_spacing=0
 GtkPaned::handle_size=4
 GtkRange::trough_border=0
 GtkRange::stepper_spacing=0
 GtkScale::value_spacing=0
 GtkScrolledWindow::scrollbar_spacing=0
 GtkExpander::expander_size=10
 GtkExpander::expander_spacing=0
 GtkTreeView::vertical-separator=0
 GtkTreeView::horizontal-separator=0
 GtkTreeView::expander-size=10
 GtkTreeView::fixed-height-mode=TRUE
 GtkWidget::focus_padding=0
}
class "GtkWidget" style "gtkcompact"
style "gtkcompactextra" {
 xthickness=0
 ythickness=0
}
class "GtkButton" style "gtkcompactextra"
class "GtkToolbar" style "gtkcompactextra"
class "GtkPaned" style "gtkcompactextra"
```

And yes! You will have a much pretier Eclipse and a real ungly gnome desktop! So lets rename the file to something like `gtkrc4eclipse`. Now instead of using the eclipse executable it self we will create a small bash script to execute it:

```bash
#!/bin/sh
export MY_ECLIPSE_GTKRC=/path/to/gtkrc4eclipse
export GTK_RC_FILES=$GTK_RC_FILES:$MY_ECLIPSE_GTKRC
export GTK2_RC_FILES=$GTK2_RC_FILES:$MY_ECLIPSE_GTKRC
export JAVA_HOME
/path/to/current/eclipse &
```

## References

* [Making Eclipse look good on Linux](http://blog.xam.dk/?p=70)
* [Make your eclipse look better on ubuntu](http://lj4newbies.blogspot.com/2008/02/make-your-eclipse-look-better-on-ubuntu.html)

