var express    = require('express');
var cors       = require('cors');
var morgan     = require('morgan');
var bodyParser = require('body-parser');
var app        = express();
var cookieParser = require('cookie-parser')

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/project4');

app.use(express.static('public'));

var routes     = require('./config/routes');

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

// app.get('/#/login', function(req, res) {
// var scopes = 'user-read-private user-read-email';
// res.redirect('https://accounts.spotify.com/authorize' + 
//   '?response_type=code' +
//   '&client_id=' + fbc794752036440baf1be8e0b9a40f30 +
//   (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
//   '&redirect_uri=' + encodeURIComponent(redirect_uri));
// console.log(res)
// });

app.get("/callback" , function(req,res){

    // use cookie parser to store the access token ( making it available to angular on front end as well )
    // cookie parser stuff
    //get user info and save to db

    res.statusCode = 302;
    res.setHeader("Location" , "http://localhost:3000/#/callback" );
    res.end();

})

app.listen(3000);