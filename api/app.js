var express    = require('express');
var cors       = require('cors');
var morgan     = require('morgan');
var bodyParser = require('body-parser');
var app        = express();

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/project4');

var routes     = require('./config/routes');

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

app.listen(3000);