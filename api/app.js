var express    = require('express');
var cors       = require('cors');
var morgan     = require('morgan');
var bodyParser = require('body-parser');
var app        = express();
var cookieParser = require('cookie-parser');
var querystring = require('querystring');
var routes     = require('./config/routes');
var request = require('request'); // "Request" library

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/project4');

app.use(express.static('public'));
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);
app.use(cookieParser());


var client_id = "fbc794752036440baf1be8e0b9a40f30";
var client_secret = "3b3b3f1d7537451db861e61bbe9bfb5b";
var redirect_uri = "http://localhost:3000/callback/";

var stateKey = "spotify_auth_state";

app.get('/login', function(req, res) {

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  console.log("login state" , state);

  // your application requests authorization
  var scope = 'user-read-private user-read-email';
   res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));


});

app.get("/callback" , function(req,res){

    // use cookie parser to store the access token ( making it available to angular on front end as well )
    // var access = "http://localhost:3000/callback" + req.query.access_token;
    // token = req.query.access_token
    // console.log(token)
    // res.cookie("token" , 'cookie_value').send("token");
    // cookie parser stuff
    //get user info and save to db

    console.log("callback state" , req.query.state);


    var code = req.query.code || null;
    var state = req.query.state || null;

    console.log("cookies" , req.cookies);
    var storedState = req.cookies ? req.cookies[stateKey] : null;

    console.log("stored state" , storedState);

    if (state === null || state !== storedState) {
        res.redirect('/#' +
          querystring.stringify({
            error: 'state_mismatch'
          }));
      } else {
        res.clearCookie(stateKey);
        var authOptions = {
          url: 'https://accounts.spotify.com/api/token',
          form: {
            code: code,
            redirect_uri: redirect_uri,
            grant_type: 'authorization_code'
          },
          headers: {
            'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
          },
          json: true
        };

        request.post(authOptions, function(error, response, body) {
          if (!error && response.statusCode === 200) {

            res.cookie("auth_token", body.access_token);
            res.cookie("refresh_token", body.refresh_token);

            res.redirect("http://localhost:3000/");
           
          } else {
            res.redirect('/#' +
              querystring.stringify({
                error: 'invalid_token'
              }));
          }
        });
      }

})


// app.get('/#/login', function(req, res) {
// var scopes = 'user-read-private user-read-email';
// res.redirect('https://accounts.spotify.com/authorize' + 
//   '?response_type=code' +
//   '&client_id=' + fbc794752036440baf1be8e0b9a40f30 +
//   (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
//   '&redirect_uri=' + encodeURIComponent(redirect_uri));
// console.log(res)
// });

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};


app.listen(3000);