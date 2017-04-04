var express = require('express');
var serveStatic = require('serve-static');
var app = express();
var bodyParser = require('body-parser');
var api = require('./server/api');
var router = require('./server/router');
var fs = require('fs');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Define global Vue for server-side app.js
global.Vue = require('vue');

// init api routes
api(app);
router(app);

app.use(serveStatic('public'));
app.listen(process.env.PORT, function () {
  console.log('listening on port ' + process.env.PORT + '...');
});
