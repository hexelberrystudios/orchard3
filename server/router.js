'use strict';

var appRoutes = {
  //login: require('./routes/login'),
  app: require('./routes/vue-ssr')
};

module.exports = function (app) {
  app.get('/', appRoutes.app);
  app.get('/app', appRoutes.app);
  app.get('/app/*', appRoutes.app);
};
