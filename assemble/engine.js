/*jshint node:true*/

"use strict";

var jade = require('jade');

function render (tmpl, opt, cb) {
  var options = {
    filename: opt.page.src,
    pretty: true
  };
  var page = opt.page;
  var template = null;
  if (page.md) {
    var templateFile = page.template || opt.jade.defaultTemplate;
    options.filename = opt.jade.templates + templateFile;
    template = jade.compileFile(options.filename, options);
  } else {
    template = jade.compile(tmpl, options);
  }
  cb(null, template(opt));
}

module.exports = {
  render: render
};
