const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Post = mongoose.model('Post');

// Index
router.get("/", (req, res) => {
    Post.find({}, (err, posts) => {
        res.render('index', { title: 'Nicholas Griffin - Web Developer, Blogger and Technology Enthusiast', posts: posts })
    }).sort({ date: 'descending' }).limit(6);
});
// Blog
router.get("/blog", (req, res) => {
    Post.find({}, (err, posts) => {
        res.render('blog', { title: 'Blog | Nicholas Griffin', posts: posts })
    }).sort({ date: 'descending' });
});
// Single Page
router.get("/post-single/:postID", (req, res) => {
    let postID = false;
    if (req.params.postID) {
        postID = req.params.postID;
    } else {
        postID = req.query.postID
    }
    if (postID) {
        Post.find({ '_id': postID }, (err, posts) => {
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
// Single Page
router.get("/post-single/:postID", (req, res) => {
    let postID = false;
    if (req.params.postID) {
        postID = req.params.postID;
    } else {
        postID = req.query.postID
    }
    if (postID) {
        Post.find({ '_id': postID }, (err, posts) => {
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
router.get("/post-single", (req, res) => {
    let postID = false;
    if (req.params.postID) {
        postID = req.params.postID;
    } else {
        postID = req.query.postID
    }
    if (postID) {
        Post.find({ '_id': postID }, (err, posts) => {
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
// Offline
router.get("/offline", (req, res) => {
    res.render('offline', { title: 'You are offline | Nicholas Griffin' });
});
// Shite
router.get("/shite", (req, res) => {
    res.render('shite', { title: 'Shite | Nicholas Griffin' });
});

router.use('/api', require('./api'));
router.use('/admin', require('./admin'));

module.exports = router;