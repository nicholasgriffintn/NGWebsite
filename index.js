//Initiate our app
var express = require('express');
const app = express();
const port     = process.env.PORT || 8080;
const passport = require('passport');
const mongoose = require('mongoose');
const flash    = require('connect-flash');

const morgan    = require('morgan');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

const cors = require('cors');
require('mongoose-type-html');
const errorHandler = require('errorhandler');
const path = require('path');
const compression = require('compression');

const configDB = require('./config/database.js');

//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

//Configure isProduction variable
const isProduction = process.env.NODE_ENV === 'production';

//Configure our app
app.set('trust proxy', true);
app.use(cors());
app.use(require('morgan')('dev'));
app.use(cookieParser());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'sahshhaahsahhsshahasy473ggdsh', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

if (!isProduction) {
    app.use(errorHandler());
}

//Configure Mongoose
mongoose.connect(configDB.url, { useNewUrlParser: true });
mongoose.set('debug', true);

// modelss
require('./models/Users');
require('./models/Post');
const Post = mongoose.model('Post');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


// config
require('./config/passport');

// Routes
app.use(express.static(__dirname + '/srv'));

app.use(require('./routes'));

// To allow cross origin request
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
});

app.listen(port);
console.log('The website is now live on the port: ' + port);
