/*jshint node:true*/
"use strict";

var jade = require('jade');

var render = function (tmpl, opt, cb) {
  var template = jade.compileFile(opt.jade.layout, {
    filename: opt.page.src,
    pretty: true
  });
  cb(null, template(opt.page));
};

module.exports = {
  render: render
};
