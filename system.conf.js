/*eslint-env browser*/
/*eslint-disable no-var*/
/*global System*/
'use strict';

(function (g) {

  function createConfig(prefix) {
    var pre = prefix || '/';
    return {
      defaultJSExtensions: true,
      map: {
        'preact': pre + 'node_modules/preact/dist/preact.dev.js',
        'moment': pre + 'node_modules/moment/min/moment.min.js',
        'marked': pre + 'node_modules/marked/marked.min.js',
        'base64-js': pre + 'node_modules/base64-js/lib/b64.js',
        'tslib': pre + 'node_modules/tslib/tslib.js'
      }
    };
  }

  if (g.System) {
    g.System.config(createConfig());
  } else  {
    g.createSystemConfig = createConfig;
  }
})(typeof window !== 'undefined' ? window : module.exports);
