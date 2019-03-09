const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/upload', require('./uploads'));

module.exports = router;