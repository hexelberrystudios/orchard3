'use strict';

var user = require('./api/user');

function restrict (req, res, next) {
  // @TODO: authenticate
  next();
}

// auth example
// app.post('/api/post', restrict, thread.get);

// @TODO
module.exports = function (app) {
  
};
