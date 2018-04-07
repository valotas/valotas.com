/*eslint-env browser*/
/*eslint-disable no-var*/
/*global module*/

(function (g) {
  'use strict';

  function createConfig(prefix) {
    var pre = prefix || '/';
    return {
      map: {
        'preact': pre + 'node_modules/preact/dist/preact.dev.js',
        'preact/devtools': pre + 'node_modules/preact/devtools.js',
        'prismjs': pre + 'node_modules/prismjs/prism.js',
        'prismjs/components/prism-java': pre + 'node_modules/prismjs/components/prism-java',
        'prismjs/components/prism-groovy': pre + 'node_modules/prismjs/components/prism-groovy',
        'moment': pre + 'node_modules/moment/min/moment.min.js',
        'marked': pre + 'node_modules/marked/marked.min.js',
        'base64-js': pre + 'node_modules/base64-js/index.js',
        'tslib': pre + 'node_modules/tslib/tslib.js'
      },
      packages: {
        '': {
          defaultExtension: 'js'
        }
      }
    };
  }

  if (g.System) {
    g.System.config(createConfig());
  } else  {
    g.createSystemConfig = createConfig;
  }
})(typeof window !== 'undefined' ? window : module.exports);
