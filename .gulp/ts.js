'use strict';

var Builder = require('systemjs-builder');
var createSystemConfig = require('../system.conf.js').createSystemConfig;
var exec = require('child_process').exec;

function execTsc (watch, cb) {
  var cmd = 'node_modules/typescript/bin/tsc -p .';
  if (watch) {
    cmd += ' -w';
  }
  exec(cmd, cb);
}

module.exports = {
  task: function () {
    return function (cb) {
      execTsc(false, cb);
    };
  },
  watch: function () {
    execTsc(true);
  },
  bundle: function (gulp, basepath) {
    var conf = createSystemConfig(basepath + '/');
    var builder = new Builder(conf);
    
    return function (cb) {
      builder.buildStatic('./build/typescript/main.js', './build/assets/bundle.js', { 
          runtime: false,
          minify: true 
        })
        .then(cb.bind(this, null), cb); 
    }
  }
};
