'use strict';

var init = function (app, paths) {
  var fs = require('fs');
  var path = require('path');
  var createBundleRenderer = require('vue-server-renderer').createBundleRenderer;
  var render = require('./render.js');
  var bundlePath = path.resolve(__dirname, '../../public/server-bundle.js');
  var renderer,
    i;

  // parse index.html template
  var html = (function getLayout() {
    var template = fs.readFileSync(path.resolve(__dirname, '../../views/index.html'), 'utf-8');
    var i = template.indexOf('{{ APP }}');
    // @TODO: Figure out how vue-style-loader works
    // styles are injected dynamically via vue-style-loader in development
    //var style = isProd ? '<link rel="stylesheet" href="/dist/styles.css">' : ''
    var style = '';
    return {
      head: template.slice(0, i).replace('{{ STYLE }}', style),
      tail: template.slice(i + '{{ APP }}'.length)
    }
  })();

  renderer = createBundleRenderer(fs.readFileSync(bundlePath, 'utf-8'));

  for (i = 0; i < paths.length; i++) {
    app.get(paths[i], function (req, res, next) {
      render.renderLayout(renderer, html, req, res);
    });
  }
}

module.exports = init;