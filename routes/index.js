const express = require('express');
const router = express.Router();

router.use('/user', require('./user.route'));
router.use('/dish', require('./dish.route'));
router.use('/order', require('./order.route'));


module.exports = router;