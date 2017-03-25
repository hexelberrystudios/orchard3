'use strict';

var appRoutes = {
  app: require('./routes/vue-ssr')
};

module.exports = function (app) {
  // vue rendering is scoped to the following paths:
  appRoutes.app(app, ['/', '/app', '/app/*']);
  // This is done so that the api can have GET requests, without
  // interfering with client rendering.
};
