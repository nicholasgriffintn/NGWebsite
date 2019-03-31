const express = require('express');

const router = express.Router();

function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on 
  if (req.isAuthenticated())
      return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}

//GET current route (required, only authenticated users have access)
router.get('/upload', isLoggedIn, (req, res, next) => {
  return res.render('uploader', { title: 'Upload Image'});
});

module.exports = router;