'use strict';

var exec = require('child_process').exec;

module.exports = function () {
  return function (cb) {
    exec('tsc -p .', cb);
  };
};
