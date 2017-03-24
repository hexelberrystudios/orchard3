'use strict';

var appRoutes = {
  login: require('./routes/login')
};

module.exports = function (app) {
  app.get('/', appRoutes.login);
};
