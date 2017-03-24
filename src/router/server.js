const init = function (server) {
  'use strict';
  
  const fs = require('fs');
  const path = require('path');
  const isProd = process.env.NODE_ENV === 'production';
  const createBundleRenderer = require('vue-server-renderer').createBundleRenderer
  const resolve = file => path.resolve(__dirname, file);
  const render = require('./render.js');

  // parse index.html template
  const html = (() => {
    const template = fs.readFileSync(resolve('../../public/index.html'), 'utf-8');
    const i = template.indexOf('{{ APP }}');
    // @TODO: Figure out how vue-style-loader works
    // styles are injected dynamically via vue-style-loader in development
    //const style = isProd ? '<link rel="stylesheet" href="/dist/styles.css">' : ''
    const style = '';
    return {
      head: template.slice(0, i).replace('{{ STYLE }}', style),
      tail: template.slice(i + '{{ APP }}'.length)
    }
  })();

  let renderer;
  if (isProd) {
    // create server renderer from real fs
    const bundlePath = resolve('../../dist/server-bundle.js');
    renderer = createRenderer(fs.readFileSync(bundlePath, 'utf-8'));
  } else {
    require('../../build/dev-server')(server, bundle => {
      renderer = createRenderer(bundle);
    });
  }

  function createRenderer (bundle) {
    return createBundleRenderer(bundle, {
      cache: require('lru-cache')({
        max: 1000,
        maxAge: 1000 * 60 * 15
      })
    })
  }

  return [
    {
      method: 'GET',
      path: '/app/{file*}',
      handler: function (request, reply) {
        render.renderLayout(renderer, html, request, reply);
      }
    }
  ];
}

module.exports = init;