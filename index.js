const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
require('mongoose-type-html');
const errorHandler = require('errorhandler');
var express = require('express');
var path = require('path');
var compression = require('compression')
const passport = require('passport');

//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

//Configure isProduction variable
const isProduction = process.env.NODE_ENV === 'production';

//Initiate our app
const app = express();

//Configure our app
app.set('trust proxy', true);
app.use(cors());
app.use(require('morgan')('dev'));
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'sahshhaahsahhsshahasy473ggdsh', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions


if (!isProduction) {
    app.use(errorHandler());
}

//Configure Mongoose
mongoose.connect('mongodb+srv://test:ojs1S5FRbzAjI51K@cluster0-tnibq.mongodb.net/test?retryWrites=true');
mongoose.set('debug', true);

// modelss
require('./models/Users');
require('./models/Post');
const Post = mongoose.model('Post');

// config
require('./config/passport');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


// Routes
app.use(express.static(__dirname + '/srv'));
// Index
app.get("/", (req, res) => {
    Post.find({}, (err, posts) => {
        res.render('index', { title: 'Nicholas Griffin - Web Developer, Blogger and Technology Enthusiast', posts: posts })
    }).sort({ date: 'descending' }).limit(3);
});
// Blog
app.get("/blog", (req, res) => {
    Post.find({}, (err, posts) => {
        res.render('index', { title: 'Blog | Nicholas Griffin', posts: posts })
    }).sort({ date: 'descending' });
});
// Single Page
app.get("/post-single", (req, res) => {
    Post.find({ '_id': req.query.postID }, (err, posts) => {
        let postTitle;
        if (posts) {
            postTitle = posts[0].title
        } else {
            postTitle = 'Undefined'
        }
        res.render('post-single', { title: postTitle + ' | Nicholas Griffin', posts: posts })
    }).sort({ date: 'descending' });
});
// TechNutty
app.get("/technutty", (req, res) => {
    res.render('technutty', { title: 'TechNutty | Nicholas Griffin' });
});
// Shite
app.get("/shite", (req, res) => {
    res.render('shite', { title: 'Shite | Nicholas Griffin' });
});
// Login Page
app.get("/login", (req, res) => {
    res.render('login', { title: 'Login | Nicholas Griffin' });
});

// router
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

app.listen(8000);
