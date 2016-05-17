/*eslint-env browser*/
/*global System*/

(function (g) {
  
  function createConfig(prefix) {
    var pre = prefix || '/';
    return {
      defaultJSExtensions: true,
      map: {
        'react': pre + 'node_modules/react/dist/react.min.js',
        'react-dom': pre + 'node_modules/react-dom/dist/react-dom.min.js',
        'moment': pre + 'node_modules/moment/min/moment.min.js',
        'marked': pre + 'node_modules/marked/marked.min.js',
        'base64-js': pre + 'node_modules/base64-js/lib/b64.js'
      }  
    };
  }
  
  if (g.System) {
    g.System.config(createConfig());
  } else  {
    g.createSystemConfig = createConfig; 
  }
})(typeof window !== 'undefined' ? window : module.exports);
