---
title: Grails fileupload without touching the scaffolding actions (kinda)
author: valotas
date: 2009-11-20
template: article.jade
---

Well, when I'm prototyping and generally developing with grails I do not want to use generate-all and just edit the generated controllers and gsps. I try to find my way overwriting maybe some actions but not edit them and some or more changes to the scaffold templates.

## Setup

So after adding the basic domain classes I always end up doing a `grails install-templates` in order to start playing with the templates. In most cases this works just fine except from one case. File uploading is a little bit tricky. Most times (actually all the times) I wan't the uploaded files to be stored somewhere (not in the database) and just keep a record of the path of the file to the database. Consider something like the domain class below:

```groovy
class UploadedFile {
  String filepath
}
```

The point here is to just use this class for the prototyping and then handle more "exotic" stuff like fileupload. Lets say that the time to handle this exotic stuff has came...

## beforeInterceptor to the rescue

Grails has the ability to intercept calls to actions. All we want to do is before an action (save, and update in this case) just do the fileupload and replace the posted parameter with the path in order to be used by the action.

```groovy
class UploadedFileController {
  def scaffold = true
  def beforeInterceptor = [action:this.&fileupload, only: ['save', 'update']]
 
  def fileupload() {
    def filepath //the path of the uploaded file
    // handle normal file upload as per grails docs
    params.filepath = filepath
  }
}
```

This is it! Isn't it? Well, it isn't! For some reason data Binding does not work witch means that we have to also edit the Controller template in order exclude the filepath and put it manually. So a the save action we replace the `def ${propertyName} = new ${className}(params)` with:

```groovy
def ${propertyName} = new ${className}()
bindData(${propertyName}, params, [exclude: 'filepath'])
if (params.filepath) ${propertyName}.filepath = params.filepath
```

And in the update action replace `${propertyName}.properties = params` with

```groovy
bindData(${propertyName}, params, [exclude: 'filepath'])
if (params.filepath) ${propertyName}.filepath = params.filepath
```

And if you don't care about deleting the files when a UploadFile domain gets deleted you are done.

