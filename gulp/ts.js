'use strict';

const Builder = require('systemjs-builder');
const {createSystemConfig} = require('../system.conf.js');
const {exec} = require('child_process');

function execTsc (watch, cb) {
  let cmd = 'node_modules/typescript/bin/tsc -p .';
  if (watch) {
    cmd += ' -w';
  }
  exec(cmd, { maxBuffer: 1024 * 500 }, cb);
}

module.exports = {
  task: () => {
    return (cb) => {
      execTsc(false, cb);
    };
  },
  watch: () => {
    execTsc(true);
  },
  bundle: (gulp, basepath) => {
    const conf = createSystemConfig(basepath + '/');
    const builder = new Builder(conf);
    
    return (cb) => {
      builder.buildStatic('./build/typescript/main.js', './build/assets/bundle.js', { 
          runtime: false,
          minify: true 
        })
        .then(cb.bind(this, null), cb); 
    }
  }
};
