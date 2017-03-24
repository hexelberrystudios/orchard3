var express = require('express');
var serveStatic = require('serve-static');
var app = express();
var bodyParser = require('body-parser');
var api = require('./server/api');
var router = require('./server/router');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// init api routes
api(app);
router(app);

app.use(serveStatic('public'));
app.listen(8000, function () {
  console.log('listening on port 8000...');
});
