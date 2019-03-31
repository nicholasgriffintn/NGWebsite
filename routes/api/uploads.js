const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const auth = require('../auth');
const Users = mongoose.model('Users');

const router = express.Router();
const upload = require('../../helpers/upload');
const Resize = require('../../helpers/resize');

function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on 
  if (req.isAuthenticated())
      return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}

router.post('/post', isLoggedIn, upload.single('image'), async function (req, res) {
    const imagePath = path.join(__dirname, '../../srv/uploads/images');
    const fileUpload = new Resize(imagePath);
    if (!req.file) {
      res.status(401).json({error: 'Please provide an image'});
    }
    const filename = await fileUpload.save(req.file.buffer);
    return res.status(200).json({ name: filename });
});

module.exports = router;