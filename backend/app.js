var express = require('express');
var path = require('path');
var logger = require('morgan');
var cors = require('cors');

var bodyParser = require('body-parser');

var router = require('./routes/router');
const errorHandler = require('./loggers/errorHandler');

var app = express();

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());

app.use('/', router);

app.use(errorHandler);

app.listen(8080, () => {
  console.log("Server has started");
});


module.exports = app;
