const router = require('express').Router();

const destinationRoutes = require('./destination');

router.use('/destination', destinationRoutes);

module.exports = router;
