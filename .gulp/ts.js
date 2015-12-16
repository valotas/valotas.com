'use strict';

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
  }
};
