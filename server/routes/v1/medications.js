const express = require('express');
const router = express.Router();

router.use('/medications', require('./medications'));

module.exports = router;