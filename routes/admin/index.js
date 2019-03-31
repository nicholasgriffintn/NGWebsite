const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/tools', require('./tools'));

module.exports = router;