const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Post = mongoose.model('Post');

// Index
router.get("/", (req, res) => {
    Post.find({}, (err, posts) => {
        res.render('index', { title: 'Nicholas Griffin - Web Developer, Blogger and Technology Enthusiast', posts: posts })
    }).sort({ date: 'descending' }).limit(3);
});
// Blog
router.get("/blog", (req, res) => {
    Post.find({}, (err, posts) => {
        res.render('index', { title: 'Blog | Nicholas Griffin', posts: posts })
    }).sort({ date: 'descending' });
});
// Single Page
router.get("/post-single", (req, res) => {
    if (req.query.postID) {
        Post.find({ '_id': req.query.postID }, (err, posts) => {
            let postTitle;
            if (posts) {
                postTitle = posts[0].title
            } else {
                postTitle = 'NotFound'
            }
            res.render('post-single', { title: postTitle + ' | Nicholas Griffin', posts: posts })
        }).sort({ date: 'descending' });
    } else {
        Post.find({ '_id': 'notFound' }, (err, posts) => {
            let postTitle;
            if (posts) {
                postTitle = posts[0].title
            } else {
                postTitle = 'NotFound'
            }
            res.render('post-single', { title: postTitle + ' | Nicholas Griffin', posts: posts })
        }).sort({ date: 'descending' });
    }
});
// TechNutty
router.get("/technutty", (req, res) => {
    res.render('technutty', { title: 'TechNutty | Nicholas Griffin' });
});
// Shite
router.get("/shite", (req, res) => {
    res.render('shite', { title: 'Shite | Nicholas Griffin' });
});

router.use('/api', require('./api'));
router.use('/admin', require('./admin'));

module.exports = router;