const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
require('mongoose-type-html');
const errorHandler = require('errorhandler');

var express = require('express');
var path = require('path');

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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

if (!isProduction) {
    app.use(errorHandler());
}

//Configure Mongoose
mongoose.connect('mongodb+srv://test:ojs1S5FRbzAjI51K@cluster0-tnibq.mongodb.net/test?retryWrites=true');
mongoose.set('debug', true);

var postSchema = new mongoose.Schema({ posttype: String, title: String, date: String, image: String, excerpt: String, body: mongoose.SchemaTypes.Html });
var Post = mongoose.model('Post', postSchema);

// modelss
require('./models/Users');

// config
require('./config/passport');

// To serve static assets in root dir
app.use(express.static(__dirname + '/srv'));
// To serve static assets in root dir
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


// Routes
// Index
app.get("/", (req, res) => {
    Post.find({}, (err, posts) => {
       res.render('index', { posts: posts})
    }).sort({date: 'descending'}).limit(3);
});
// Blog
app.get("/blog", (req, res) => {
    Post.find({}, (err, posts) => {
       res.render('index', { posts: posts})
    }).sort({date: 'descending'});
});
// Single Page
app.get("/post-single", (req, res) => {
    Post.find({ '_id': req.query.postID }, (err, posts) => {
       res.render('post-single', { posts: posts})
    }).sort({date: 'descending'});
});
// For creating posts
app.post('/addpost', (req, res) => {
    var postData = new Post(req.body);
    postData.save().then( result => {
        res.status(200).send("Post saved.");
    }).catch(err => {
        res.status(400).send("Unable to save data");
    });
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
