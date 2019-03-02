const mongoose = require('mongoose');

var postSchema = new mongoose.Schema({ posttype: String, title: String, date: String, image: String, excerpt: String, body: mongoose.SchemaTypes.Html });
mongoose.model('Post', postSchema);