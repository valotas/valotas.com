/*jshint node:true*/
/*globals describe, it, expect, beforeEach, jasmine*/

'use strict';

var engine = require('./engine');

describe('engine', function () {
  var cb;

  beforeEach(function () {
    cb = jasmine.createSpy("cb");
  });

  it('should try to render the given template as jade', function () {
    var options = {
      page: {
        layout: 'layout.jade',
        src: 'path/to/the/file'
      }
    };

    engine.render('h1 jade #{page.src}', options, cb);
    expect(cb).toHaveBeenCalledWith(null, '\n<h1>jade path/to/the/file</h1>');
  });

  describe('markdown', function () {
    it('should try to render giben page.template when page is markdown', function () {
      var options = {
        jade: {
          templates: 'src/templates/'
        },
        page: {
          md: true,
          template: 'layout.jade',
          src: 'path/to/file'
        }
      };

      engine.render('markdown text', options, cb);
      expect(cb).toHaveBeenCalled();
    });
  });
});
