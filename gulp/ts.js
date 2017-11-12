'use strict';

const Builder = require('systemjs-builder');
const { createSystemConfig } = require('../system.conf.js');
const { spawn } = require('child_process');
const { argv } = require('yargs');
const utils = require('gulp-util');

function execTsc({ watch }, cb) {
  const cmd = 'node_modules/typescript/bin/tsc';
  const args = ['-p', '.'];
  if (watch) {
    args.push('-w');
  }
  const child = spawn(cmd, args);
  if (cb) {
    child.on('error', cb);
    child.on('close', code => {
      const err =
        code !== 0
          ? new Error(`Could not execute 'tsc ${args.join(' ')}'`)
          : null;
      cb(err);
    });
  }
  child.stdout.on('data', data => {
    data = data.toString().trim();
    if (!data) {
      return;
    }
    const command = utils.colors.magenta(`tsc ${args.join(' ')}`);
    utils.log(`[${command}] ${data.toString()}`);
  });
  return child;
}

module.exports = {
  task: () => cb => {
    execTsc({}, cb);
  },
  watch: () => {
    execTsc({ watch: true });
  },
  bundle: (gulp, basepath) => {
    const conf = createSystemConfig(basepath + '/');
    const builder = new Builder(conf);

    return cb => {
      builder
        .buildStatic('./build/typescript/main.js', './build/assets/bundle.js', {
          runtime: false,
          minify: !argv.skipMinify
        })
        .then(cb.bind(this, null), cb);
    };
  }
};
