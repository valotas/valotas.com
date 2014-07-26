/*jshint node:true*/
"use strict";

var jade = require('jade');
var markdown = require('markdown').markdown;

var isMdFile = function (file) {
  return file.indexOf('.md', file.length - 3) !== -1;
};

var render = function (tmpl, opt, cb) {
  var file = opt.page.src;
  if (isMdFile(file)) {
    console.log(opt.page);
    opt.page.html = function () {
      return markdown.toHTML(tmpl);
    };
    return jade.renderFile(opt.jade.layout, opt.page, cb);
  }
  return jade.render(tmpl, opt.page, cb);
};

module.exports = {
  render: render
};
