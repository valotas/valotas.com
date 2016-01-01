/*global System*/

System.config({
  packages: {
    '/typescript': {
        'defaultExtention': 'js'
    },
  },
  map: {
    'react': '/node_modules/react/dist/react.min.js',
    'react-dom': '/node_modules/react-dom/dist/react-dom.min.js',
    'moment': '/node_modules/moment/min/moment.min.js',
    'marked': '/node_modules/marked/marked.min.js',
    'pako': '/node_modules/pako/dist/pako_inflate.min.js',
    'base64-js': '/node_modules/base64-js/lib/b64.js'
  }
});
