const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();

function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on 
  if (req.isAuthenticated())
      return next();

  // if they aren't redirect them to the login page
  res.redirect('/admin/auth/login');
}

// Login Page
router.get("/login", (req, res) => {
    res.render('login', { message: req.flash('loginMessage'), title: 'Login | Nicholas Griffin' });
});

// Logout Page
router.get('/logout', function(req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

// signup Page
router.get("/signup", isLoggedIn, (req, res) => {
    res.render('signup', { message: req.flash('signupMessage'), title: 'Signup | Nicholas Griffin' });
});

router.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile', {
        user : req.user, title: 'Profile | Nicholas Griffin'
    });
});

module.exports = router;