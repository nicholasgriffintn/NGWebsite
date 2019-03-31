const mongoose = require('mongoose');
const router = require('express').Router();
const Users = mongoose.model('Users');
const Post = mongoose.model('Post');

function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on 
  if (req.isAuthenticated())
      return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}

// For creating posts
router.post('/addpost', isLoggedIn, (req, res) => {
  var postData = new Post(req.body);
      postData.save().then(result => {
        res.status(200).send("Post saved.");
      }).catch(err => {
        res.status(400).send("Unable to save data");
      });
});

// For deleting posts
router.post('/removepost', isLoggedIn, (req, res) => {
      var postData = new Post({_id: req.body.id});
      postData.remove().then(result => {
        res.status(200).send("Post removed.");
      }).catch(err => {
        res.status(400).send("Unable to remove data");
      });
});

module.exports = router;