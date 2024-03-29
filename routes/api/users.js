const mongoose = require('mongoose');
const router = require('express').Router();
const passport = require('passport');
const Users = mongoose.model('Users');
const Post = mongoose.model('Post');

function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on 
  if (req.isAuthenticated())
      return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}

//POST new user route (optional, everyone has access)
router.post('/signup', passport.authenticate('local-signup', {
  successRedirect : '/admin/auth/profile', // redirect to the secure profile section
  failureRedirect : '/admin/auth/signup?error=true', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
}));

//POST login route (optional, everyone has access)
router.post('/login', passport.authenticate('local-login', {
  successRedirect : '/admin/auth/profile', // redirect to the secure profile section
  failureRedirect : '/admin/auth/login?error=true', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
}));

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

//GET current route (required, only authenticated users have access)
router.get('/current', isLoggedIn, (req, res, next) => {
  return res.json({ user: Users.toAuthJSON() });
});

module.exports = router;