const express = require('express');
const router = express.Router();

const pageRoutes = require('./pages/home.js');
const apiRoutes = require('./api/index.js');

router.use('/', pageRoutes);
router.use('/api', apiRoutes);

module.exports = router;
